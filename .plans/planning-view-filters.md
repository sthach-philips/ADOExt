# Planning View Filters — Implementation Plan

| Field | Value |
|---|---|
| Branch | `feat/planning-view-filters` |
| Base | `feat/msal-auth` (stacked PR — do not target `main` directly) |
| Merge order | `feat/msal-auth` → `main` first, then retarget this PR to `main` |
| Status | ![status](https://badgen.net/badge/status/draft/grey) |
| Version | ![version](https://badgen.net/badge/draft/v8/grey) |
| Created | 2025-07-15 |
| Updated | 2025-07-15 |

---

## Objective

Expose configurable filters and toolbar buttons for all four views (Work Items, Backlog, Sprints, Boards) through the VS Code UI. All filter state and button layout is driven by a single validated DTO stored in VS Code settings. Fuzzy title search is powered by **Fuse.js**. Button add/remove/reorder requires a window reload, which the extension prompts for automatically.

---

## How the existing query system works (and where sections fit)

### Current tree structure for Work Items

```
Work Items
  └── [WorkItemScopeGroup]  ← only when multiple org/project scopes
        └── [WorkItemStateGroup]  "New"      ← derived from System.State values
              └── WorkItemNode  #123 Fix login bug
        └── [WorkItemStateGroup]  "Active"
              └── WorkItemNode  #456 Add dashboard
```

The `WorkItemStateGroup` sections ("New", "Active", etc.) are **not** hardcoded — they are dynamically derived from whatever `System.State` values ADO returns for the fetched work items. The order is controlled by a hardcoded `stateSortValue()` switch in `workItemProvider.ts`.

The **active query** (`assigned` / `created` / `mentioned` / `all`) controls *which items are fetched* via WIQL. It is a single active selection — only one query runs at a time. `selectWorkItemQuery` switches between them.

### What "sub-sections" means in this context

A sub-section is a named `WorkItemStateGroup`-like node that groups items by a configurable criterion — not just `System.State`. The question is: **can we add new grouping dimensions as collapsible sections?**

**Yes.** The tree node hierarchy in `getChildren()` is fully extensible. We can introduce a new node type `WorkItemSectionGroup` that sits at the same level as `WorkItemStateGroup` but is defined entirely by config — its label, its filter predicate (which items belong to it), and its sort position are all driven by the `PlanningConfig` DTO.

---

## Configurable sections design

### What a section is

A section is a named group of work items defined by a **WIQL WHERE fragment** or a set of **field matchers**. Examples:

```jsonc
// User's settings.json
"adoext.planningViews": {
  "workItems": {
    "sections": [
      {
        "id": "new",
        "label": "New",
        "stateFilter": ["New", "Proposed"],
        "order": 1
      },
      {
        "id": "active",
        "label": "Active",
        "stateFilter": ["Active", "In Progress", "Committed"],
        "order": 2
      },
      {
        "id": "ready",
        "label": "Ready for Review",
        "stateFilter": ["Ready", "Ready for Review"],
        "order": 3
      }
    ]
  }
}
```

Each section defines which `System.State` values belong to it. Items whose state does not match any section are either hidden or collected into an implicit "Other" section (configurable).

### Why this is better than a flat `stateFilter` array

The flat `stateFilter: string[]` approach (previous plan versions) maps one state → one section. The `sections` array approach allows:
- **Many-to-one grouping:** multiple states collapsed into one section (e.g. "Active" + "In Progress" + "Committed" → one "Active" section)
- **Custom labels:** the section label is independent of the state name
- **Explicit ordering:** `order` field, not array index, controls position — easier to insert between existing sections
- **Per-section collapsibility:** each section can default to expanded or collapsed

### Relationship to `selectWorkItemQuery`

`selectWorkItemQuery` controls **which items are fetched** (the WIQL filter). Sections control **how fetched items are grouped and displayed**. They are orthogonal:

```
selectWorkItemQuery  →  "Assigned to me"  (WIQL: AssignedTo = @me)
                              ↓
                    fetched work items
                              ↓
              sections group them client-side:
                    [New]  [Active]  [Ready]
```

The existing `selectWorkItemQuery` / `saveWorkItemQuery` commands are **unchanged**. Sections are a display-layer concern layered on top.

---

## Updated DTO Design

### New file: `src/config/planningConfig.ts`

```ts
/** A single toolbar button entry. */
export interface PlanningViewAction {
    command: string;   // registered adoext.* command id
    icon: string;      // codicon name e.g. "refresh", "search"
    tooltip: string;
}

/** A configurable section (state group) within a view. */
export interface PlanningViewSection {
    id: string;              // stable identifier
    label: string;           // display label for the section header
    stateFilter: string[];   // System.State values that belong to this section
    order: number;           // sort position among sections
    collapsed?: boolean;     // default collapsed state (default: false = expanded)
}

/** Filter fields shared by global and per-view configs. */
export interface PlanningFilterFields {
    assignedFilter: 'all' | 'mine'; // migrated from adoext.planningAssignedFilter
    areaFilter: string;       // ADO UNDER clause value, "" = off
    iterationFilter: string;  // ADO UNDER clause value, "" = off
    titleFilter: string;      // fuzzy match on title via Fuse.js, "" = off
    typeFilter: string[];     // work item type names, [] = all types
    showUnmatchedStates: boolean; // show items whose state matches no section (default: true)
}

/** Global filter — applied as a baseline to all views. */
export type PlanningGlobalFilter = PlanningFilterFields;

/** Per-view config — filter fields + sections + actions. */
export type PlanningViewConfig = PlanningFilterFields & {
    sections: PlanningViewSection[];   // [] = fall back to dynamic state grouping
    actions: PlanningViewAction[];
};

/** Root config object stored at adoext.planningViews. */
export interface PlanningConfig {
    global: PlanningGlobalFilter;
    workItems: PlanningViewConfig;
    backlog: PlanningViewConfig;
    sprints: PlanningViewConfig;
    boards: PlanningViewConfig;
}
```

Exports:
- `DEFAULT_PLANNING_CONFIG: PlanningConfig`
- `parsePlanningConfig(raw: unknown): PlanningConfig`
- `resolveFilter(config: PlanningConfig, view: keyof Omit<PlanningConfig, 'global'>): PlanningFilterFields`
- `resolveSections(config: PlanningConfig, view: keyof Omit<PlanningConfig, 'global'>): PlanningViewSection[]`

### Section resolution

```ts
function resolveSections(config: PlanningConfig, view): PlanningViewSection[] {
    // Per-view sections take full precedence — no merging with global
    // (global has no sections; sections are always view-specific)
    return [...config[view].sections].sort((a, b) => a.order - b.order);
}
```

### Filter resolution

```ts
function resolveFilter(config, view): PlanningFilterFields {
    const g = config.global;
    const v = config[view];
    return {
        assignedFilter:      v.assignedFilter      !== ''   ? v.assignedFilter      : g.assignedFilter,
        areaFilter:          v.areaFilter           || g.areaFilter,
        iterationFilter:     v.iterationFilter      || g.iterationFilter,
        titleFilter:         v.titleFilter          || g.titleFilter,
        typeFilter:          v.typeFilter.length    ? v.typeFilter             : g.typeFilter,
        showUnmatchedStates: v.showUnmatchedStates  ?? g.showUnmatchedStates,
    };
}
```

---

## Default config value

`sections: []` for all views means the existing dynamic state grouping behaviour is preserved out of the box. Users opt into custom sections by adding entries.

```jsonc
{
  "global": {
    "assignedFilter": "all",
    "areaFilter": "",
    "iterationFilter": "",
    "titleFilter": "",
    "typeFilter": [],
    "showUnmatchedStates": true
  },
  "workItems": {
    "assignedFilter": "",
    "areaFilter": "",
    "iterationFilter": "",
    "titleFilter": "",
    "typeFilter": [],
    "showUnmatchedStates": true,
    "sections": [],
    "actions": [
      { "command": "adoext.refreshWorkItems",          "icon": "refresh",         "tooltip": "Refresh Work Items" },
      { "command": "adoext.selectWorkItemQuery",        "icon": "filter",          "tooltip": "Select Work Item Query" },
      { "command": "adoext.openSavedQuery",             "icon": "search",          "tooltip": "Open Saved Query" },
      { "command": "adoext.saveWorkItemQuery",          "icon": "save",            "tooltip": "Save Work Item Query Preset" },
      { "command": "adoext.createWorkItem",             "icon": "add",             "tooltip": "Create Work Item" },
      { "command": "adoext.setWorkItemFilter",          "icon": "filter",          "tooltip": "Filter Work Items" },
      { "command": "adoext.setWorkItemSort",            "icon": "sort-precedence", "tooltip": "Sort Work Items" },
      { "command": "adoext.toggleHideDoneWorkItems",    "icon": "eye-closed",      "tooltip": "Toggle Hide Done Work Items" }
    ]
  },
  "backlog": {
    "assignedFilter": "",
    "areaFilter": "",
    "iterationFilter": "",
    "titleFilter": "",
    "typeFilter": [],
    "showUnmatchedStates": true,
    "sections": [],
    "actions": [
      { "command": "adoext.openBacklogView",            "icon": "open-preview", "tooltip": "Open Backlog in Editor" },
      { "command": "adoext.refreshBacklog",             "icon": "refresh",      "tooltip": "Refresh Backlog" },
      { "command": "adoext.setPlanningAssignedFilter",  "icon": "person",       "tooltip": "Filter by Assignee" },
      { "command": "adoext.setPlanningAreaFilter",      "icon": "folder",       "tooltip": "Filter by Area" },
      { "command": "adoext.setPlanningTitleFilter",     "icon": "search",       "tooltip": "Filter by Title" }
    ]
  },
  "sprints": {
    "assignedFilter": "",
    "areaFilter": "",
    "iterationFilter": "",
    "titleFilter": "",
    "typeFilter": [],
    "showUnmatchedStates": true,
    "sections": [],
    "actions": [
      { "command": "adoext.openSprintView",             "icon": "open-preview", "tooltip": "Open Sprint in Editor" },
      { "command": "adoext.refreshSprints",             "icon": "refresh",      "tooltip": "Refresh Sprints" },
      { "command": "adoext.setPlanningAssignedFilter",  "icon": "person",       "tooltip": "Filter by Assignee" },
      { "command": "adoext.setPlanningIterationFilter", "icon": "calendar",     "tooltip": "Filter by Iteration" },
      { "command": "adoext.setPlanningAreaFilter",      "icon": "folder",       "tooltip": "Filter by Area" },
      { "command": "adoext.setPlanningTitleFilter",     "icon": "search",       "tooltip": "Filter by Title" }
    ]
  },
  "boards": {
    "assignedFilter": "",
    "areaFilter": "",
    "iterationFilter": "",
    "titleFilter": "",
    "typeFilter": [],
    "showUnmatchedStates": true,
    "sections": [],
    "actions": [
      { "command": "adoext.openBoardView",              "icon": "open-preview", "tooltip": "Open Board in Editor" },
      { "command": "adoext.refreshBoards",              "icon": "refresh",      "tooltip": "Refresh Boards" },
      { "command": "adoext.setPlanningAssignedFilter",  "icon": "person",       "tooltip": "Filter by Assignee" },
      { "command": "adoext.setPlanningStateFilter",     "icon": "list-filter",  "tooltip": "Filter by State" },
      { "command": "adoext.setPlanningAreaFilter",      "icon": "folder",       "tooltip": "Filter by Area" },
      { "command": "adoext.setPlanningTitleFilter",     "icon": "search",       "tooltip": "Filter by Title" }
    ]
  }
}
```

---

## Section grouping logic in providers

### When `sections` is empty (default)

Existing `buildStateGroups()` / `boardColumns()` behaviour is used unchanged — items are grouped by their raw `System.State` value and sorted by `stateSortValue()`.

### When `sections` is non-empty

```
fetched items
    │
    ├── fuzzyFilter (titleFilter via Fuse.js)
    │
    ├── areaFilter / iterationFilter (already applied server-side in WIQL)
    │
    └── section grouping:
          for each section (sorted by order):
              collect items where System.State ∈ section.stateFilter
          if showUnmatchedStates = true:
              collect remaining items into implicit "Other" section at end
          if showUnmatchedStates = false:
              discard remaining items
```

A new `WorkItemSectionGroup` tree node type is introduced (alongside the existing `WorkItemStateGroup`) to represent a configured section. It carries the section `label`, `id`, and `collapsed` default.

### Tree node type union (updated)

```ts
type WorkItemTreeNode =
    | WorkItemScopeGroup       // multi-scope grouping (unchanged)
    | WorkItemSectionGroup     // NEW: config-driven named section
    | WorkItemStateGroup       // existing: dynamic state grouping (used when sections = [])
    | WorkItemNode
    | vscode.TreeItem;
```

Both `WorkItemSectionGroup` and `WorkItemStateGroup` render identically in the tree — collapsible header with item count. The difference is purely in how they are constructed.

---

## How toolbar button visibility + reload works

### Visibility (runtime, no reload needed)

On activation and on every `onDidChangeConfiguration` for `adoext.planningViews`, each provider calls:
```ts
vscode.commands.executeCommand('setContext', 'adoext.backlogActions',
    config.planningViews.backlog.actions.map(a => a.command)
);
```

Each `view/title` entry in `package.json` has a `when` clause:
```jsonc
{
  "command": "adoext.refreshBacklog",
  "when": "view == adoext.backlog && adoext.backlogActions contains 'adoext.refreshBacklog'",
  "group": "navigation@2"
}
```

### Order (requires reload)

When `onDidChangeConfiguration` detects the ordered command list in an `actions` array has changed (compared against `context.globalState` snapshot), the extension shows:

```
"Toolbar button order has changed. Reload the window to apply."  [Reload Now]
```

Clicking "Reload Now" calls `vscode.commands.executeCommand('workbench.action.reloadWindow')`.

> Button order in the toolbar is fixed by `navigation@N` in `package.json` at activation time — this is a VS Code platform constraint. The reload prompt is the UX signal that the change has been applied.

---

## Fuzzy search with Fuse.js

Add `fuse.js@7.5.0` as a production dependency.

### New file: `src/utils/planningFilter.ts`

```ts
import Fuse from 'fuse.js';

export function fuzzyFilterItems<T>(
    items: T[],
    titleFilter: string,
    getTitle: (item: T) => string
): T[] {
    if (!titleFilter.trim()) return items;
    const fuse = new Fuse(items, {
        keys: [{ name: 'title', getFn: getTitle }],
        threshold: 0.4,
        includeScore: false,
        ignoreLocation: true,
    });
    return fuse.search(titleFilter).map(r => r.item);
}
```

---

## Files to create / change

### New: `src/config/planningConfig.ts`
- Interfaces: `PlanningViewAction`, `PlanningViewSection`, `PlanningFilterFields`, `PlanningGlobalFilter`, `PlanningViewConfig`, `PlanningConfig`
- `DEFAULT_PLANNING_CONFIG`
- `parsePlanningConfig(raw: unknown): PlanningConfig`
- `resolveFilter(config, view): PlanningFilterFields`
- `resolveSections(config, view): PlanningViewSection[]`

### New: `src/utils/planningFilter.ts`
- `fuzzyFilterItems<T>(items, titleFilter, getTitle): T[]`

### Changed: `src/config/configManager.ts`
- Add `get planningViews(): PlanningConfig`
- Add `async setPlanningViewFilter(view, patch: Partial<PlanningFilterFields>): Promise<void>`
- Add `async setPlanningGlobalFilter(patch: Partial<PlanningFilterFields>): Promise<void>`
- Keep existing `planningAssignedFilter` getter/setter untouched

### New: `src/commands/planningCommands.ts`
- `setPlanningAreaFilter(view, client, config)` — QuickPick from `SharedCache` area paths
- `setPlanningIterationFilter(view, client, config)` — QuickPick from `SharedCache` iteration paths
- `setPlanningTypeFilter(view, client, config)` — multi-select QuickPick from `WorkItemTypeSchema[]` type names; writes `typeFilter: string[]`
- `setPlanningStateFilter(view, client, config)` — multi-step wizard: label → multi-select states (from `WorkItemTypeSchema[].states`) → order; builds `PlanningViewSection[]`
- `setPlanningTitleFilter(view, client, config)` — input box; optionally prompts for threshold
- `setPlanningGlobalFilter(client, config)` — multi-step QuickPick for all global filter fields

### Changed: `src/providers/workItemProvider.ts`
- Add `WorkItemSectionGroup` tree node class
- `buildStateGroups` checks `resolveSections` — uses section grouping when non-empty, falls back to existing `stateSortValue` logic when empty
- Sets `adoext.workItemsActions` context key on refresh

### Changed: `src/providers/planningProviders.ts`
- `loadPlanningItems` accepts `view` key, calls `resolveFilter`, passes `areaFilter`/`iterationFilter` to `client.getPlanningWorkItems`, applies `fuzzyFilterItems`
- `boardColumns` and backlog grouping check `resolveSections` — same fallback pattern
- Each provider sets its context key on init and refresh

### Changed: `src/api/adoClient.ts`
- `getPlanningWorkItems` gains `options?: { areaFilter?: string; iterationFilter?: string }`

### Changed: `src/extension.ts`
- Register 4 new planning commands
- In `onDidChangeConfiguration`: detect `actions` array order changes, prompt reload
- Update all 4 view context keys on config change

### Changed: `package.json`
- Add `fuse.js` and `lowdb` to `dependencies`
- New config property `adoext.planningViews` with inline JSON schema + default object
- New command declarations: `adoext.setPlanningAreaFilter`, `adoext.setPlanningIterationFilter`, `adoext.setPlanningTypeFilter`, `adoext.setPlanningStateFilter`, `adoext.setPlanningTitleFilter`, `adoext.setPlanningGlobalFilter`, `adoext.refreshWorkItemTypeSchema`
- All `view/title` entries for all 4 views updated with context key `when` clauses and `navigation@N` ordering
- `adoext.setPlanningTypeFilter` added to Work Items view `view/title` entries only (not planning views by default)

---

## What does NOT change

- `selectWorkItemQuery` / `saveWorkItemQuery` commands and their underlying query filter system
- Backlog parent/child hierarchy building
- Sprint grouping by iteration label
- `workItemHideStates` global behavior
- All PR and pipeline views
- `adoext.setPlanningAssignedFilter` command implementation
- Auth, session, and notification handling

---

---

## Hardcoded limits audit — candidates for configuration

All values below are currently hardcoded constants or magic numbers. The proposal is to move each into `adoext.*` settings with the current value as the default, validated with `minimum`/`maximum` bounds in the JSON schema.

### Already configurable (do not duplicate)

| Setting | Current default | Notes |
|---|---|---|
| `adoext.pipelineRunsTop` | `25` | Already in `package.json`, min 1 max 100 |
| `adoext.pullRequestCommentPollIntervalSeconds` | `300` | Already in `package.json`, min 60 |

---

### Candidates to make configurable

#### `src/api/adoClient.ts`

| Constant | Current value | Proposed setting | Min | Max | Notes |
|---|---|---|---|---|---|
| `WORK_ITEM_QUERY_LIMIT` | `200` | `adoext.workItemQueryLimit` | 1 | 500 | Max items fetched per scope for Work Items view |
| `PLANNING_WORK_ITEM_QUERY_LIMIT` | `500` | `adoext.planningQueryLimit` | 1 | 1000 | Max items fetched per scope for Backlog/Sprint/Board WIQL query |
| `PLANNING_WORK_ITEM_TOTAL_LIMIT` | `1000` | `adoext.planningTotalLimit` | 1 | 5000 | Hard cap including parent items fetched recursively |
| `COMPLETION_WORK_ITEM_LIMIT` | `50` | `adoext.completionWorkItemLimit` | 10 | 200 | Max items loaded for inline `#id` completions |
| `BUILDS_PER_QUERY` | `10` | `adoext.buildsPerQuery` | 1 | 50 | Max builds fetched per PR / work item artifact link |
| `PR_LIMIT` (inline, not a module const) | `100` | `adoext.pullRequestLimit` | 1 | 500 | Max PRs fetched per scope |
| `WORK_ITEM_TYPE_ICON_CACHE_TTL_MS` | `3600000` (1 hour) | `adoext.workItemIconCacheTtlMinutes` | 5 | 1440 | TTL for remote work item type icon URLs; expose in minutes for readability |
| `WORK_ITEM_BATCH_SIZE` | `200` | `adoext.workItemBatchSize` | 1 | 200 | Items fetched per ADO API batch call. Default lowered to `50` to reduce API pressure; hard max of 200 is the ADO API constraint |
| Classification node depth (`10` in `getClassificationNode`) | `10` | `adoext.classificationNodeDepth` | 1 | 20 | Depth of area/iteration path tree fetched for QuickPick |
| Query folder depth (`2` in `getQueries`) | `2` | `adoext.savedQueryFolderDepth` | 1 | 5 | Depth of saved query folder traversal |

#### `src/providers/pipelinesProvider.ts`

| Constant | Current value | Proposed setting | Min | Max | Notes |
|---|---|---|---|---|---|
| `TimelineCache` max size (`200`) | `200` | `adoext.pipelineTimelineCacheSize` | 10 | 1000 | In-memory LRU cap for pipeline timeline records |

#### `src/providers/projectScopes.ts`

| Constant | Current value | Proposed setting | Min | Max | Notes |
|---|---|---|---|---|---|
| `concurrency = 4` (default param) | `4` | `adoext.scopeFetchConcurrency` | 1 | 10 | Parallel scope fetches; higher = faster with many orgs/projects, higher API load |

#### `src/api/adoClient.ts` — `TtlCache` for work item types

| Constant | Current value | Proposed setting | Min | Max | Notes |
|---|---|---|---|---|---|
| `TtlCache<WorkItemType[]>(300_000)` | `300000` ms (5 min) | `adoext.workItemTypeSchemaCacheTtlMinutes` | 30 | 1440 | TTL for full work item type schema (types + fields + states). Default 240 min (4 hr) — long because the fan-out is N×2 API calls per project. Separate from icon TTL. |
| `WORK_ITEM_TYPE_ICON_CACHE_TTL_MS` | `3600000` (1 hour) | `adoext.workItemIconCacheTtlMinutes` | 5 | 1440 | TTL for remote work item type icon URLs only. Separate namespace from schema. |

#### `src/extension.ts`

| Constant | Current value | Proposed setting | Min | Max | Notes |
|---|---|---|---|---|---|
| Config debounce `setTimeout(..., 300)` | `300` ms | Not user-facing — UI responsiveness tuning. **Leave hardcoded.** | — | — | No user benefit in exposing this |

#### `src/utils/planningFilter.ts` (new, from this plan)

| Constant | Current value | Proposed setting | Min | Max | Notes |
|---|---|---|---|---|---|
| Fuse.js `threshold: 0.4` | `0.4` | `adoext.fuzzySearchThreshold` | 0.0 | 1.0 | `0` = exact match only, `1` = match anything. Expose as a number with step 0.05 |

---

### Summary: new settings to add to `package.json`

```jsonc
"adoext.workItemQueryLimit":          { type: number, default: 200,  min: 1,   max: 500  }
"adoext.planningQueryLimit":          { type: number, default: 500,  min: 1,   max: 1000 }
"adoext.planningTotalLimit":          { type: number, default: 1000, min: 1,   max: 5000 }
"adoext.completionWorkItemLimit":     { type: number, default: 50,   min: 10,  max: 200  }
"adoext.buildsPerQuery":              { type: number, default: 10,   min: 1,   max: 50   }
"adoext.pullRequestLimit":            { type: number, default: 100,  min: 1,   max: 500  }
"adoext.workItemTypeSchemaCacheTtlMinutes": { type: number, default: 240, min: 30,  max: 1440 }
"adoext.workItemIconCacheTtlMinutes":        { type: number, default: 60,  min: 5,   max: 1440 }
"adoext.classificationNodeDepth":     { type: number, default: 10,   min: 1,   max: 20   }
"adoext.savedQueryFolderDepth":       { type: number, default: 2,    min: 1,   max: 5    }
"adoext.pipelineTimelineCacheSize":   { type: number, default: 200,  min: 10,  max: 1000 }
"adoext.scopeFetchConcurrency":       { type: number, default: 4,    min: 1,   max: 10   }
"adoext.workItemBatchSize":           { type: number, default: 50,   min: 1,   max: 200  }
"adoext.fuzzySearchThreshold":        { type: number, default: 0.4,  min: 0.0, max: 1.0  }
```

All are read through `ConfigManager` getters with `Math.max`/`Math.min` guards matching the schema bounds — same pattern as the existing `pipelineRunsTop` getter.

---

## Shared cross-window caching

### The problem

Each VS Code window runs its own extension host process. The current `TtlCache` and `Map`-based caches in `adoClient.ts` and `pipelinesProvider.ts` are **in-memory only** — they are not shared between windows and are lost on every reload. With multiple windows open against the same ADO org, the same API calls are made redundantly from each window.

### What VS Code provides

`ExtensionContext.globalStorageUri` is a `vscode.Uri` pointing to a directory on disk that is:
- **The same path for all windows** running the same extension
- Persisted across reloads and restarts
- Located at `~/.vscode-server/data/User/globalStorage/MarcKassubeck.adoext/` on this system

This is the correct place for a shared on-disk cache. It is already used by GitLens, GitHub Copilot Chat, and Amazon Q on this machine.

### Why not Redis / SQLite / DuckDB?

- **Redis** requires a running server — not acceptable as an extension dependency
- **SQLite via `better-sqlite3`** and **DuckDB** are native modules requiring a `.node` binary compiled for the exact Node/Electron ABI. The extension bundles with esbuild targeting `node18` as a plain CJS bundle — native modules cannot be bundled and require a separate `node_modules` directory to be shipped with the `.vsix`. This adds significant packaging complexity and is fragile across VS Code updates that change the Electron/Node ABI
- **`keyv` + `@keyv/sqlite`** has the same native module problem via `better-sqlite3` as its underlying driver
- **Docker + Redis** breaks the extension's core UX contract — users install from the marketplace with one click and should not need to run `docker compose up` before opening VS Code
- **`rippledb`** — abandoned, last published May 2022
- **Valkeyrie** — promising (type-safe KV, Standard Schema validation, pluggable drivers, no native deps, actively maintained as of June 2026). Worth revisiting as a follow-up once the JSON file cache is in place. The abstraction overhead is not justified for the current cache scope.

### Chosen approach: `lowdb` + `steno` in `globalStorageUri`

**`lowdb@7`** is a tiny JSON database for Node with a single dependency (`steno`) that handles atomic file writes (write-to-tmp + rename). No native modules, pure TypeScript/ESM, zero infrastructure.

- `lowdb` is ESM-only (`"type": "module"`). The esbuild config outputs CJS today. Mitigation: add `lowdb` to esbuild's `external` array and load it via a dynamic `import()` wrapper at runtime — Node 18 supports top-level `await` in ESM and `import()` in CJS. Alternatively, switch the bundle format to ESM (one-line esbuild change); VS Code extension hosts support ESM bundles since VS Code 1.90.
- One `lowdb` `JSONFilePreset` instance per cache namespace (e.g. `workItemTypes`, `areaPaths`, `iterationPaths`)
- Each DB file contains `{ entries: Record<string, { value: T, expiresAt: number }> }`
- `steno` handles atomic writes automatically — no manual temp-file logic needed
- In-memory layer in front: read from `_mem` first, fall back to `lowdb` on miss, write through to both

### New file: `src/utils/sharedCache.ts`

```ts
import { JSONFilePreset } from 'lowdb/node';

type CacheFile<T> = { entries: Record<string, { value: T; expiresAt: number }> };

export class SharedCache<T> {
    private _mem = new Map<string, { value: T; expiresAt: number }>();
    private _db: Awaited<ReturnType<typeof JSONFilePreset<CacheFile<T>>>> | undefined;

    constructor(
        private readonly _storageDir: string,
        private readonly _namespace: string,
        private readonly _ttlMs: number
    ) {}

    async init(): Promise<void> {
        this._db = await JSONFilePreset<CacheFile<T>>(
            path.join(this._storageDir, `${this._namespace}.cache.json`),
            { entries: {} }
        );
        // Warm in-memory layer from disk, evicting expired entries
        const now = Date.now();
        for (const [k, v] of Object.entries(this._db.data.entries)) {
            if (v.expiresAt > now) this._mem.set(k, v);
        }
    }

    get(key: string): T | undefined {
        const entry = this._mem.get(key);
        if (!entry || Date.now() > entry.expiresAt) { this._mem.delete(key); return undefined; }
        return entry.value;
    }

    async set(key: string, value: T): Promise<void> {
        const entry = { value, expiresAt: Date.now() + this._ttlMs };
        this._mem.set(key, entry);
        if (this._db) {
            this._db.data.entries[key] = entry;
            await this._db.write(); // steno handles atomic write + debounce internally
        }
    }

    async clear(): Promise<void> {
        this._mem.clear();
        if (this._db) { this._db.data.entries = {}; await this._db.write(); }
    }
}
```

### Work item type schema cache — the foundation for filtering

The ADO API exposes rich per-type metadata that is currently only partially used (icons, state names). The full schema — fields, allowed values, state categories — is the foundation for the type filter and custom field filter features.

**What the API provides per work item type:**

- `getWorkItemTypes(project)` → `WorkItemType[]`
  - `name`, `referenceName`, `color`, `icon.url`
  - `fields: WorkItemTypeFieldInstance[]` — each has `name`, `referenceName`, `allowedValues?`, `defaultValue?`, `alwaysRequired?`
  - `states` — not included here; requires `getWorkItemTypeStates(project, type)` → `WorkItemStateColor[]` with `name`, `category`, `color`
- `getWorkItemTypeFieldsWithReferences(project, type, expand: All)` → `WorkItemTypeFieldWithReferences[]`
  - Adds `allowedValues` (the full picklist for fields like `Priority`, `Severity`, custom dropdowns)
  - This is the call needed to populate filter QuickPicks for custom fields

**Proposed `WorkItemTypeSchema` DTO** (cached per org+project scope):

```ts
export interface WorkItemFieldSchema {
    name: string;           // display name e.g. "Priority"
    referenceName: string;  // e.g. "Microsoft.VSTS.Common.Priority"
    allowedValues: string[]; // empty if free-text
    isIdentity: boolean;    // true for AssignedTo-style fields
}

export interface WorkItemStateSchema {
    name: string;      // e.g. "Active"
    category: string;  // e.g. "InProgress", "Completed", "Proposed", "Resolved"
    color: string;     // hex color from ADO
}

export interface WorkItemTypeSchema {
    name: string;           // e.g. "User Story"
    referenceName: string;  // e.g. "Microsoft.VSTS.Agile.UserStory"
    color: string;
    iconUrl: string;
    fields: WorkItemFieldSchema[];
    states: WorkItemStateSchema[];
}
```

This is fetched once per org+project scope on first use, stored in a dedicated `SharedCache` namespace with its own TTL, and shared across all windows. It replaces the current fragmented caches (`_workItemTypesCache`, `_workItemStatesByType`, `_workItemTypeIconsByScope`).

**Separate cache namespaces and TTLs:**

The schema data has two distinct volatility profiles that warrant separate KV namespaces and TTL settings:

| Namespace | `SharedCache` file | Default TTL | Setting | Rationale |
|---|---|---|---|---|
| `workItemTypeSchemas` | `workItemTypeSchemas.cache.json` | 4 hours | `adoext.workItemTypeSchemaCacheTtlMinutes` (min 30, max 1440) | Type/field/state definitions change only when a process template is modified — rare, admin-only action. Long TTL prevents hammering the fan-out API calls (`getWorkItemTypes` + N×`getWorkItemTypeStates` + N×`getWorkItemTypeFieldsWithReferences`) on every window open. |
| `workItemTypeIcons` | `workItemTypeIcons.cache.json` | 60 min | `adoext.workItemIconCacheTtlMinutes` (min 5, max 1440) | Icon URLs are stable but served from ADO CDN; shorter TTL is fine since it's a single cheap call. |

The schema TTL is intentionally long (4 hours default) because the fan-out cost is significant: for a project with 10 work item types, `getWorkItemTypeSchemas` makes 1 + 10 + 10 = 21 API calls. With multiple windows open, the shared cache means this happens at most once per TTL period across all windows, not once per window per session.

A manual refresh command (`adoext.refreshWorkItemTypeSchema`) is provided to force a cache bust when a process template change is known to have occurred, without waiting for TTL expiry.

**New method on `AdoClient`:**

```ts
async getWorkItemTypeSchemas(
    project: string,
    organization?: string
): Promise<WorkItemTypeSchema[]>
```

Internally: calls `getWorkItemTypes` for the type list, then fans out `getWorkItemTypeStates` and `getWorkItemTypeFieldsWithReferences(..., All)` per type concurrently (respecting `scopeFetchConcurrency`). Result is stored in `SharedCache<WorkItemTypeSchema[]>('workItemTypeSchemas')` keyed by `org+project`.

**Design principle: schema-first, always valid**

The `WorkItemTypeSchema[]` cache is the single source of truth for all filter values. No filter value is ever hardcoded or typed freehand by the user in the guided path:
- Type names come from `WorkItemTypeSchema[].name`
- State names come from `WorkItemTypeSchema[].states[].name`
- Field allowed values come from `WorkItemTypeSchema[].fields[].allowedValues`
- Area/iteration paths come from `SharedCache` classification paths

When a guided command writes a filter value to `settings.json`, it has already been validated against the live schema. If ADO renames a state or a team adds a custom work item type, the cache TTL expires, the schema is re-fetched, and the next wizard invocation reflects the current state. Stale values already persisted in `settings.json` are silently ignored at filter-apply time (no match = no items filtered out, same as `showUnmatchedStates: true` behavior).

Direct `settings.json` editing is still supported and schema-validated by JSON Schema in the editor, but the allowed values for string fields like state names cannot be enumerated in JSON Schema (they are dynamic per org/project). The guided path is therefore the recommended way to set filter values.

**How this enables type filtering:**

With `WorkItemTypeSchema[]` available client-side, the filter system can:
- Populate a `System.WorkItemType IN (...)` clause in WIQL for server-side type filtering (most efficient — reduces items fetched)
- Populate QuickPick lists for custom field filters with their allowed values
- Drive section `stateFilter` QuickPick with real state names + categories from the schema instead of hardcoded strings
- Show state category badges (Proposed / InProgress / Resolved / Completed) in the tree

**WIQL type filter integration:**

`PlanningFilterFields` gains `typeFilter: string[]` (array of type names, empty = all). When non-empty, `getPlanningWorkItems` appends:
```sql
AND [System.WorkItemType] IN ('User Story', 'Bug')
```
This is server-side — it reduces the result set before the `top` limit is applied, which is the correct place for it.

### What gets cached in `SharedCache` vs stays in-memory

| Data | Cache type | Rationale |
|---|---|---|
| `WorkItemTypeSchema[]` per org+project | `SharedCache` `workItemTypeSchemas` (4 hr TTL) | Replaces 3 separate caches; long TTL prevents fan-out hammering |
| Work item type icon URLs per org+project | `SharedCache` `workItemTypeIcons` (60 min TTL) | Separate namespace — different volatility profile from schema |
| Area paths per org+project | `SharedCache` `areaPaths` (no TTL — invalidated on scope change) | Same volatility as org/project config; expires on `organizations`/`projectsByOrganization` change, not on time |
| Iteration paths per org+project | `SharedCache` `iterationPaths` (no TTL — invalidated on scope change) | Same model as area paths; also cleared by `adoext.refreshWorkItemTypeSchema` |
| Current user identity per org | In-memory `Map` only — not migrated to `SharedCache` | Single cheap call; correctly invalidated on `updateToken()`/`disconnect()`; stale-cache risk outweighs benefit |
| Fetched work items (tree view data) | In-memory only | Changes frequently, view-specific, short-lived |
| PR list | In-memory only | Changes frequently, per-bucket |
| Pipeline timeline records | In-memory LRU (existing) | Short-lived, large, not worth disk I/O |
| Auth tokens | Never cached here — handled by `AuthProvider` | Security boundary |

### Pagination

The ADO REST APIs support pagination via `continuationToken` (Build API, Git API) and `$skip`/`$top` (Work Item Tracking WIQL). Currently the extension fetches a single page up to the configured limit.

**Does the current code support paging through results?**

- `queryByWiql` — accepts a `top` parameter. The API returns all matching IDs up to `top` in one call. There is no continuation token for WIQL — the `top` parameter is the only control. **No pagination possible here; the limit is the page.**
- `getWorkItems` (batch fetch by IDs) — the existing `fetchWorkItemsIntoMap` loop already pages through ID batches using `WORK_ITEM_BATCH_SIZE`. This is internal pagination and works correctly.
- `getPullRequestsByProject` — accepts `top` and `skip` via `GitPullRequestSearchCriteria`. **Pagination is possible.**
- `getBuilds` — accepts `top` and `continuationToken`. **Pagination is possible.**
- `getTestRuns` — accepts `skip` and `top`. **Pagination is possible.**

**Proposed pagination strategy:**

Rather than fetching all pages eagerly on load (which defeats the purpose of lower limits), the tree view shows a **"Load more..."** node at the bottom of each scope group when the result count equals the configured limit, indicating there are likely more results. Clicking it fetches the next page and appends to the existing list.

This requires:
- `AdoClient` methods that support it (`getPullRequests`, `listPipelineRuns`) to accept and return a `continuationToken` or `skip` offset
- Providers to track per-scope pagination state (current page token + accumulated items)
- A `LoadMoreNode` tree item class that triggers the next fetch when activated

WIQL-based work item fetches (`getWorkItems`, `getPlanningWorkItems`) **cannot be paginated** — the `top` limit is absolute. The lower defaults proposed in the limits audit are the correct mitigation here.

### Revised defaults (lower, API-friendly)

With the `SharedCache` reducing redundant fetches and pagination reducing initial load size, the defaults can be lowered significantly:

| Setting | Old default | New default | Rationale |
|---|---|---|---|
| `adoext.workItemQueryLimit` | 200 | 50 | Covers most personal queues; user can raise if needed |
| `adoext.planningQueryLimit` | 500 | 100 | First page of planning items; pagination handles the rest |
| `adoext.planningTotalLimit` | 1000 | 200 | Includes parent fetches; lower default reduces recursive API calls |
| `adoext.completionWorkItemLimit` | 50 | 25 | Completions need to be fast; 25 is plenty for type-ahead |
| `adoext.buildsPerQuery` | 10 | 5 | Per PR/work item; rarely need more than 5 recent builds |
| `adoext.pullRequestLimit` | 100 | 25 | First page; pagination handles the rest |
| `adoext.workItemBatchSize` | 50 (lowered from 200) | 50 | Already lowered; keep |
| `adoext.pipelineRunsTop` | 25 | 25 | Already reasonable; keep |
| `adoext.workItemTypeSchemaCacheTtlMinutes` | 5 (was `TtlCache` 5 min) | 240 | Schema fan-out is 21+ API calls per project; long TTL prevents hammering |
| `adoext.workItemIconCacheTtlMinutes` | 60 | 60 | Icon URLs are stable; keep |
| `adoext.scopeFetchConcurrency` | 4 | 2 | Lower default to be polite; power users can raise |

### Files to create / change (additions to existing list)

**New: `src/utils/sharedCache.ts`**
- `SharedCacheEntry<T>` interface
- `SharedCache<T>` class — file-backed, TTL-aware, debounced writes, atomic rename

### Changed: `src/api/adoClient.ts`
- Accept `storageDir: string` in constructor (passed from `ExtensionContext.globalStorageUri.fsPath`)
- Add `getWorkItemTypeSchemas(project, organization?): Promise<WorkItemTypeSchema[]>` — fans out `getWorkItemTypeStates` + `getWorkItemTypeFieldsWithReferences(..., All)` per type, stores in `SharedCache<WorkItemTypeSchema[]>('workItemTypeSchemas')`
- Remove `_workItemTypesCache`, `_workItemStatesByType`, `_workItemTypeIconsByScope` — all replaced by `SharedCache` backed `getWorkItemTypeSchemas`
- `getPlanningWorkItems` and `getWorkItems` accept `options?: { areaFilter?: string; iterationFilter?: string; typeFilter?: string[] }` and append WIQL clauses server-side
- `getPullRequests` and `listPipelineRuns` return `{ items: T[], continuationToken?: string }` to support pagination

**Changed: `src/providers/workItemIconResolver.ts`**
- Use `SharedCache` for icon URL resolution

### Changed: `src/extension.ts`
- Pass `context.globalStorageUri.fsPath` to `AdoClient` constructor
- Ensure `globalStorageUri` directory exists before passing (VS Code creates it lazily)
- Register `adoext.refreshWorkItemTypeSchema` command — clears `workItemTypeSchemas`, `areaPaths`, `iterationPaths` caches then triggers provider refresh
- In `onDidChangeConfiguration`: when `organizations` or `projectsByOrganization` changes, clear `areaPaths` and `iterationPaths` `SharedCache` entries for removed scopes

**Changed: `src/providers/pullRequestProvider.ts` and `src/providers/pipelinesProvider.ts`**
- Track `continuationToken` / `skip` per scope
- Append `LoadMoreNode` when result count equals the configured limit
- Handle `LoadMoreNode` activation in `getChildren`

---

## Resolved decisions

1. **`showUnmatchedStates` default:** `true` — items whose state matches no section appear in an implicit "Other" group at the end. Safe default, no data loss.

2. **`setPlanningStateFilter` / section management UX:** Multi-step wizard via QuickPick (label → states multi-select → order). The `adoext.planningViews` setting is also directly editable in `settings.json` with full JSON schema validation. Both paths write the same DTO. See **Settings UI compatibility** below.

3. **`planningAssignedFilter` migration:** Migrate now — fold into `PlanningFilterFields` as `assignedFilter: 'all' | 'mine'`. The existing `adoext.planningAssignedFilter` setting is kept as a deprecated alias read during migration; `ConfigManager` writes the new path on first access.

4. **Fuse.js threshold:** User-configurable via `adoext.fuzzySearchThreshold` (number, default `0.4`, min `0.0`, max `1.0`). Also surfaced as a guided edit command `adoext.setPlanningTitleFilter` which sets both the filter string and optionally the threshold.

5. **Global filter UI:** `adoext.setPlanningGlobalFilter` command exists and opens a multi-step QuickPick for area, iteration, title, and assignee. Direct `settings.json` editing is also fully supported via schema.

6. **`adoext.refreshWorkItemTypeSchema` placement:** Command palette registration + surfaced as a QuickPick item inside the type/state filter wizards ("Schema last updated Xh ago — Refresh"). No toolbar button. Also clears `areaPaths` and `iterationPaths` caches as a side effect. Must be added to the command declarations in `package.json` and registered in `extension.ts`.

7. **`typeFilter` toolbar button:** Added to the Work Items view default `actions` only. Planning views (Backlog/Sprint/Board) omit it from defaults — the hierarchy already provides type context. The filter still works on all views via direct `settings.json` editing. Documented in `settings.example.jsonc`.

8. **Area/iteration path cache:** No TTL. Keyed by `org+project` (`scopeKey()`), invalidated when `organizations` or `projectsByOrganization` config changes — same lifecycle as the org/project scope selection itself. `onDidChangeConfiguration` handler clears both caches on scope change. No `adoext.*CacheTtlMinutes` setting needed.

9. **`currentUserIds` cache:** Stays as in-memory `Map` only — not migrated to `SharedCache`. The fetch is a single lightweight call, correctly invalidated on `updateToken()`/`disconnect()`, and carries enough security sensitivity that stale-cache risk outweighs the cross-window sharing benefit.

---

## Settings UI compatibility

### What VS Code renders natively in the Settings editor

The VS Code Settings editor (the GUI at `Preferences: Open Settings (UI)`) renders configuration properties based on their JSON Schema type:

| Schema shape | Settings UI rendering |
|---|---|
| `type: string/number/boolean` | Text input / number input / checkbox |
| `type: string` with `enum` | Dropdown |
| `type: array` of primitives | Editable list |
| `type: array` of objects (with `properties`) | **"Edit in settings.json"** link — no inline GUI |
| `type: object` with flat `properties` (all primitive values) | Expandable section with individual controls |
| `type: object` with nested object `properties` | **"Edit in settings.json"** link — no inline GUI |

The GitHub Pull Requests extension (`githubPullRequests.queries`) uses `array` of objects with `properties` — it renders as **"Edit in settings.json"** in the Settings UI. This is the same pattern `adoext.workItemQueries` and `adoext.pullRequestQueries` already use today.

### What this means for `adoext.planningViews`

`adoext.planningViews` is a nested object (`global` + four view keys, each containing `sections: PlanningViewSection[]`). This will render as **"Edit in settings.json"** in the Settings UI — the same as the existing query arrays.

This is acceptable because:
- The guided wizard commands (`adoext.setPlanningAreaFilter`, `adoext.setPlanningTitleFilter`, `adoext.setPlanningStateFilter`, `adoext.setPlanningGlobalFilter`) are the primary UX for casual users
- Power users who prefer direct editing get full JSON Schema validation and IntelliSense in `settings.json`
- A `settings.example.jsonc` file (see below) documents every field with comments

The flat scalar settings (`adoext.workItemQueryLimit`, `adoext.fuzzySearchThreshold`, etc.) all render natively in the Settings UI with sliders/inputs as normal.

---

## Documentation: `settings.example.jsonc`

A fully-commented example file at `docs/settings.example.jsonc` documents every ADOExt setting. It serves as the reference for users who prefer direct `settings.json` editing over the guided commands.

Structure:

```jsonc
// ADOExt — full settings reference
// Copy any of these into your VS Code settings.json.
// All values shown are defaults unless noted otherwise.
{
  // ── Authentication ────────────────────────────────────────────────────────
  // "vscode" uses VS Code's built-in Microsoft auth (default).
  // Use "msal" if VS Code auth fails in WSL or behind a proxy.
  "adoext.authMethod": "vscode",

  // ── Organization / project scope ─────────────────────────────────────────
  "adoext.organizations": ["mycompany"],
  "adoext.projectsByOrganization": {
    "mycompany": ["MyProject"]  // use ["*"] to include all projects
  },

  // ── Planning views ────────────────────────────────────────────────────────
  // adoext.planningViews is best edited via the guided commands:
  //   ADOExt: Filter by Area / Iteration / Title / Assignee / State / Type
  // Direct editing is fully supported — schema validation is active in settings.json.
  //
  // IMPORTANT: state names, type names, and field allowed values in this section
  // are illustrative examples only. The actual valid values depend on your ADO
  // organization's process template (Agile, Scrum, CMMI, or custom).
  // Use the guided commands to populate these from your live ADO schema, or run
  // ADOExt: Refresh Work Item Type Schema to see current values for your project.
  "adoext.planningViews": {
    // global: baseline applied to all views unless overridden per-view
    "global": {
      "assignedFilter": "all",     // "all" | "mine"
      "areaFilter": "",            // ADO area path prefix, e.g. "MyProject\\TeamA"
      "iterationFilter": "",       // ADO iteration path prefix, e.g. "MyProject\\Sprint 5"
      "titleFilter": "",           // fuzzy title search string
      "showUnmatchedStates": true  // show items whose state matches no section
    },
    "workItems": {
      // Per-view overrides — empty string means "use global value"
      "assignedFilter": "",
      "areaFilter": "",
      "iterationFilter": "",
      "titleFilter": "",
      "showUnmatchedStates": true,
      // sections: [] means use the default dynamic state grouping (stateSortValue behavior).
      // Add entries to group states into named sections with custom labels and ordering.
      "sections": [
        // Example: collapse "New" and "Proposed" into one "New" section
        { "id": "new",    "label": "New",    "stateFilter": ["New", "Proposed"],                        "order": 1 },
        { "id": "active", "label": "Active", "stateFilter": ["Active", "In Progress", "Committed"],    "order": 2 },
        { "id": "review", "label": "Review", "stateFilter": ["Ready", "Ready for Review"],             "order": 3, "collapsed": true }
      ],
      "actions": [
        // Controls which toolbar buttons appear and in what order.
        // Order changes require a window reload (VS Code platform constraint).
        { "command": "adoext.refreshWorkItems",       "icon": "refresh",         "tooltip": "Refresh" },
        { "command": "adoext.selectWorkItemQuery",     "icon": "filter",          "tooltip": "Select Query" },
        { "command": "adoext.createWorkItem",          "icon": "add",             "tooltip": "Create Work Item" },
        { "command": "adoext.setWorkItemFilter",       "icon": "search",          "tooltip": "Filter" },
        { "command": "adoext.setWorkItemSort",         "icon": "sort-precedence", "tooltip": "Sort" }
      ]
    },
    "backlog":  { /* same shape as workItems */ },
    "sprints":  { /* same shape as workItems */ },
    "boards":   { /* same shape as workItems */ }
  },

  // ── Fuzzy search ──────────────────────────────────────────────────────────
  // 0.0 = exact match only, 1.0 = match anything. Default 0.4 is a good balance.
  "adoext.fuzzySearchThreshold": 0.4,

  // ── API limits ────────────────────────────────────────────────────────────
  "adoext.workItemQueryLimit":      50,   // max items fetched per scope (Work Items view)
  "adoext.planningQueryLimit":     100,   // max items per WIQL query (Backlog/Sprint/Board)
  "adoext.planningTotalLimit":     200,   // hard cap including recursively fetched parents
  "adoext.workItemBatchSize":       50,   // items per ADO batch API call (max 200)
  "adoext.pullRequestLimit":        25,   // max PRs fetched per scope (first page)
  "adoext.pipelineRunsTop":         25,   // max pipeline runs fetched per scope
  "adoext.buildsPerQuery":           5,   // max builds fetched per PR / work item link
  "adoext.completionWorkItemLimit": 25,   // max items loaded for inline #id completions
  "adoext.scopeFetchConcurrency":    2,   // parallel org/project scope fetches

  // ── Cache TTLs ────────────────────────────────────────────────────────────
  "adoext.workItemTypeSchemaCacheTtlMinutes": 240, // work item type schema (types+fields+states). Long TTL — fan-out is N×2 API calls per project.
  "adoext.workItemIconCacheTtlMinutes":       60,  // remote work item type icon URLs (separate namespace, different volatility)

  // ── Notifications ─────────────────────────────────────────────────────────
  "adoext.pullRequestCommentPollIntervalSeconds": 300
}
```

This file is linked from the extension's README and from the `markdownDescription` of `adoext.planningViews` in `package.json` via a relative docs link.
