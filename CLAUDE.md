# CLAUDE.md

> Full development guide: **[AGENTS.md](AGENTS.md)**

## Build & Validate

```sh
pnpm install          # install dependencies
pnpm run compile      # full build (type check + esbuild)
pnpm run check:extension && pnpm run check:webviews  # type check only (fast)
pnpm run lint         # ESLint (max-warnings=0)
pnpm run watch        # incremental rebuild on save
```

Always run `pnpm run compile` after TypeScript changes before reporting a task done.

## Custom Slash Commands

| Command | What it does |
|---------|-------------|
| `/build` | Compile the extension and report errors with file:line |
| `/check-types` | TypeScript type-check only (faster than full compile) |
| `/lint` | ESLint pass across all source files |
| `/watch` | Start background watch mode |
| `/package` | Bundle extension as `.vsix` for manual install testing |

## MCP & Tools Available

- **`playwright`** MCP — drive a browser to test the webview panels (PR details, work item details, planning, pipelines)
- **ADO MCP** is the extension's *own* feature: `McpServerManager` registers it natively with VS Code when the extension runs — it is not an agent tool

## Hooks

RTK is configured for all Bash tool calls (`rtk hook claude` in `.claude/settings.json`).
RTK saves 60–90% tokens by filtering/compressing command output.
See [.github/copilot-instructions.md](.github/copilot-instructions.md) for full RTK usage.

## Key Entry Points

- `src/extension.ts` — activation; registers all commands, providers, views
- `src/api/adoClient.ts` — all Azure DevOps API calls go here
- `src/auth/authProvider.ts` — Microsoft OAuth session management
- `src/config/configManager.ts` — all settings access (`adoext.*` namespace)

## Architecture

```
src/commands/      →  command handlers (orchestration only)
src/providers/     →  TreeDataProviders (6 tree views)
src/views/         →  webview panels + PR comment controller
src/views/webview/ →  Lit components compiled separately (tsconfig.webviews.json)
src/notifications/ →  polling + PR comment/review/status handlers
src/utils/         →  shared helpers (async, scope, repo context, notifications)
src/mcp/           →  McpServerManager (delegates to @azure-devops/mcp)
```

See **[AGENTS.md](AGENTS.md)** for conventions, pitfalls, provider patterns, and feature-add checklist.
