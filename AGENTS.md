# AGENTS.md

Agent instructions for the ADOExt VS Code extension.

## Purpose

Help coding agents make safe, minimal changes in this TypeScript VS Code extension that integrates with Azure DevOps.

## Read First

1. [README.md](README.md)
2. [src/extension.ts](src/extension.ts)
3. [src/api/adoClient.ts](src/api/adoClient.ts)
4. [src/auth/authProvider.ts](src/auth/authProvider.ts)
5. [src/config/configManager.ts](src/config/configManager.ts)

## Build And Validate

```sh
pnpm install          # install dependencies
pnpm run compile      # full build (type check + esbuild)
pnpm run check:extension && pnpm run check:webviews  # type check only (fast)
pnpm run lint         # ESLint (max-warnings=0)
pnpm run watch        # incremental rebuild on save
```

Always run `pnpm run compile` after TypeScript changes before reporting a task done.

## Claude Code Slash Commands

| Command | What it does |
|---------|-------------|
| `/build` | Compile the extension and report errors with file:line |
| `/check-types` | TypeScript type-check only (faster than full compile) |
| `/lint` | ESLint pass across all source files |
| `/watch` | Start background watch mode |
| `/package` | Bundle extension as `.vsix` for manual install testing |

## MCP and Tools

- **`playwright`** MCP -- drive a browser to test the webview panels (PR details, work item details, planning, pipelines)
- **ADO MCP** is the extension's *own* feature: `McpServerManager` registers it natively with VS Code when the extension runs -- it is not an agent tool

## Hooks (Claude Code)

RTK is configured for all Bash tool calls (`rtk hook claude` in `.claude/settings.json`).
RTK saves 60-90% tokens by filtering/compressing command output.
See [.github/copilot-instructions.md](.github/copilot-instructions.md) for full RTK usage.

## Key Entry Points

- `src/extension.ts` -- activation; registers all commands, providers, views
- `src/api/adoClient.ts` -- all Azure DevOps API calls go here
- `src/auth/authProvider.ts` -- Microsoft OAuth session management
- `src/config/configManager.ts` -- all settings access (`adoext.*` namespace)

## Architecture Map

```
src/commands/      ->  command handlers (orchestration only)
src/config/        ->  ConfigManager (settings), PlanningConfig (view config)
src/providers/     ->  6 TreeDataProviders + completion, hover, scopes, caches
src/views/         ->  webview panels + PR comment controller
src/views/webview/ ->  Lit components compiled separately (tsconfig.webviews.json)
src/notifications/ ->  polling + PR comment/review/status handlers
src/utils/         ->  shared helpers (async, scope, repo context, notifications)
src/mcp/           ->  McpServerManager (delegates to @azure-devops/mcp)
```

Tree views (6): workItems, pullRequests, pipelines, backlog, sprints, boards.

Dependency hotspots: `ConfigManager` (48 refs / 26 files), `AdoClient` (45 / 26), `notifications` (36 / 12).
Known cycle: `adoClient.ts` <-> `configManager.ts`.

## Conventions

- Use `ConfigManager` for configuration access; avoid direct ad-hoc `workspace.getConfiguration` usage in new code.
- Use `AdoClient` for Azure DevOps calls; keep API-specific logic centralized.
- Guard command flows with sign-in checks before org/project operations.
- Preserve multi-org/multi-project behavior. New data fetches should work with resolved project scopes, not single hardcoded project context.
- Prefer existing user notification helpers from `src/utils/notifications.ts` for consistent UX and logging.
- Keep provider and command changes incremental; avoid broad refactors unless requested.

## Release Versioning

- Follow SemVer conservatively for extension releases.
- Use a patch bump for bug fixes, regressions, packaging changes, and documentation-only release follow-ups.
- Use a minor bump only for new backward-compatible user-facing features.
- Use a major bump only for intentional breaking changes.
- If a requested version bump appears larger than the actual change scope, call that out and suggest the smallest appropriate bump before editing version metadata or publishing.

## Provider Patterns

- Tree views: update via existing refresh/event emitter patterns.
- Completion/hover: keep caches scoped and time-bounded; avoid storing position-bound editor objects in long-lived caches.
- PR/work item details: reuse existing panel/controller patterns instead of adding duplicate webviews.

## Pitfalls

- VS Code engine target is `^1.101.0`; avoid APIs requiring newer versions unless the engine is updated.
- PR and work item features must continue to work across multiple selected orgs/projects.
- Avoid markdown injection in hover/webview content; treat service-returned text as untrusted.
- Keep concurrent cross-scope calls bounded; do not remove existing concurrency controls without reason.

## Change Scope Rules

- Prefer minimal diffs in the relevant module.
- Do not rename commands/settings/contribution IDs unless explicitly requested.
- If command IDs are added or changed, update both `package.json` contributions and `src/extension.ts` registration.

## When Adding Features

1. Add/extend command implementation under `src/commands/` or provider under `src/providers/`.
2. Register in `src/extension.ts`.
3. Add contribution metadata (commands/menus/views) in `package.json` when needed.
4. Compile and fix TypeScript errors.
5. Update [README.md](README.md) only if user-visible behavior changed.

## Webview Architecture

The extension has two separate TypeScript compilation targets:

- **Extension host** (`tsconfig.json`): `src/` -> `bin/extension.js` via esbuild, Node/CJS target, VS Code API available.
- **Webviews** (`tsconfig.webviews.json`): `src/views/webview/` -> `media/webviews/*.js` via esbuild, browser/IIFE target, no Node APIs.

Webview components use [Lit](https://lit.dev/) (`lit` package). Communication between host and webview goes through `vscode.postMessage` / `window.addEventListener('message')`. The `src/views/webview/vscodeApi.ts` shim acquires the VS Code webview API.

Never import host-side modules from webview files or vice versa -- the build will either fail or silently break at runtime.

## Key Patterns

**Provider refresh**: Call the provider's `refresh()` method or fire its `_onDidChangeTreeData` emitter. Do not replace provider instances.

**Cross-org fetch** (`src/providers/projectScopes.ts`): Always resolve project scopes via `resolveProjectScopes()` before making API calls. New data fetches must iterate over all resolved scopes (or use `forEachScope()`), not a single hardcoded project.

**Concurrency** (`src/utils/async.ts`): Use the existing `mapWithConcurrencyLimit` helper when fetching across multiple orgs/projects. Do not remove concurrency bounds.

**Notifications** (`src/utils/notifications.ts`): Use `showInformationMessage`, `showWarningMessage`, `showErrorMessage` from this module -- they add structured logging alongside VS Code toasts.

**Error handling** (`src/utils/adoErrors.ts`, `src/providers/providerErrors.ts`): Classify ADO errors before surfacing them. Auth errors trigger re-auth via `src/utils/authRecovery.ts`.

## Common Debug Flows

**Tree view is empty**:
1. Check `AuthProvider.isSignedIn` -- if false, sign-in gate is blocking.
2. Check `ConfigManager.selectedOrganizations` -- if empty, no org is configured.
3. Check `resolveProjectScopes()` return value -- may be filtering out all projects.
4. Look for uncaught errors in the provider's `getChildren()` -- wrap in try/catch and check Output panel.

**API call fails silently**:
1. Check `AdoClient` method -- it wraps SDK calls; look for swallowed exceptions.
2. Enable the ADO Extension output channel in VS Code for structured logs.
3. Use `adoErrors.ts` classification to distinguish auth vs. network vs. not-found errors.

**Webview shows blank/broken**:
1. Run `pnpm run compile:webviews` -- webview JS is compiled separately.
2. Open VS Code Developer Tools (Help -> Toggle Developer Tools) and check the webview iframe console.
3. Check that the panel's `getWebviewContent()` passes the correct `media/webviews/*.js` URIs with `webview.asWebviewUri()`.

## Agent Tooling

This repo supports two agent tools. Both read **AGENTS.md** as the source of truth.

- **Claude Code** -- `.claude/settings.json` (MCP + permissions + rtk hook), `.claude/commands/`
- **VS Code Copilot** -- `.github/copilot-instructions.md`, `.vscode/mcp.json`, `.github/hooks/rtk-rewrite.json`

<!-- scip-query:agent-setup:begin -->
## scip-query

This repo is indexed by scip-query (compiler-resolved code intelligence).

- Use native search and file reads for literal text and source. Use scip-query when a claim depends on compiler-resolved identity, references, callers, dependencies, consumers, public surface, transitive impact, architecture, historical co-change, or a scip detector/gate.
- Unsure how to explore, plan, verify, or clean up here: invoke the `scip-query` skill — it routes to the right specialist skill.
- Each specialist skill carries its own command shortlist — prefer it over the full `_shared` catalog.
- Before the first SCIP graph claim in a work session, run `scip-query status --capabilities` once. Reuse that fresh generation until source changes. After edits, let an active watcher finish its refresh; if it is busy or a refresh request is pending, wait and recheck instead of starting a competing reindex. Run `scip-query reindex` only when freshness is stale, missing, or unknown and the watcher is disabled, unavailable, or failed to refresh.
- For a non-trivial change: establish the current entry-to-effect flow, the affected consumers, and the reuse options before editing (`scip-plan` skill, anchored by `scip-query plan-context <target>`).
- Before claiming a complete relationship set, inspect the command coverage. If it is bounded or unknown, use `--full`, a narrower scope, or follow pagination emitted by the command before making the claim.
- After the change, run the postchecks matching what you actually edited — the table is in the `scip-verify` skill — then `scip-query diff-gate`. Fix findings or state why each is accepted.
- Prefer ordinary human output for agent reading: it preserves hierarchy, whitespace, and source line numbers without the JSON transport envelope. Use `--json` only for a programmatic consumer; add `--result-only` when that consumer needs only the command result. Do not use `--compact` for model-readable evidence.
- Run scip-query commands normally, without choosing `--output-page-size` in advance. If and only if scip-query emits `Continue exactly:`, run each emitted command unchanged until the human footer reports transport completion or a JSON page reports `complete: true`; incomplete output is not evidence. Transport completion means every rendered character was retrieved, not that bounded command coverage became exhaustive. Never pipe scip-query through `head`, `tail`, or line-range `sed`. The emitted transport cursor is separate from a command result cursor such as `refs --cursor`.
- Repository records: commit `.scipquery/suppressions/*.json` and `.scipquery/events/*.json` with the code or docs change that produced them; do not ignore or drop these shared records.
- Checkout preferences: `.codex/hooks.json` and `.claude/settings.local.json` are local agent-tool settings and must not be committed.
<!-- scip-query:agent-setup:end -->
