import * as vscode from 'vscode';
import type { AdoClient } from '../api/adoClient';
import type { ConfigManager } from '../config/configManager';
import type { PlanningViewKey } from '../config/planningConfig';

function getFirstScope(config: ConfigManager): { project: string; organization: string } | undefined {
    const orgs = config.selectedOrganizations;
    if (orgs.length === 0) return undefined;
    const org = orgs[0];
    const projects = config.getProjectSelection(org);
    if (projects.length === 0) return undefined;
    return { project: projects[0], organization: org };
}

function planningViewPick(): Thenable<{ label: string; key: PlanningViewKey } | undefined> {
    return vscode.window.showQuickPick([
        { label: 'Backlog', key: 'backlog' as PlanningViewKey },
        { label: 'Sprints', key: 'sprints' as PlanningViewKey },
        { label: 'Boards', key: 'boards' as PlanningViewKey },
        { label: 'Work Items', key: 'workItems' as PlanningViewKey }
    ], { placeHolder: 'Select view to filter' });
}

export async function setPlanningAreaFilter(client: AdoClient, config: ConfigManager): Promise<void> {
    const scope = getFirstScope(config);
    if (!scope) return;

    const view = await planningViewPick();
    if (!view) return;

    const paths = await client.getAreaPaths(scope.project, scope.organization);
    const current = config.resolvedFilter(view.key).areaFilter;

    const items = [
        { label: '$(close) Clear filter', path: '' },
        ...paths.map(p => ({
            label: p.path,
            description: p.path === current ? '(current)' : undefined,
            path: p.path
        }))
    ];

    const choice = await vscode.window.showQuickPick(items, { placeHolder: 'Select area path (UNDER filter)' });
    if (!choice) return;

    await config.setPlanningViewFilter(view.key, { areaFilter: choice.path });
}

export async function setPlanningIterationFilter(client: AdoClient, config: ConfigManager): Promise<void> {
    const scope = getFirstScope(config);
    if (!scope) return;

    const view = await planningViewPick();
    if (!view) return;

    const paths = await client.getIterationPaths(scope.project, scope.organization);
    const current = config.resolvedFilter(view.key).iterationFilter;

    const items = [
        { label: '$(close) Clear filter', path: '' },
        ...paths.map(p => ({
            label: p.path,
            description: p.path === current ? '(current)' : undefined,
            path: p.path
        }))
    ];

    const choice = await vscode.window.showQuickPick(items, { placeHolder: 'Select iteration path (UNDER filter)' });
    if (!choice) return;

    await config.setPlanningViewFilter(view.key, { iterationFilter: choice.path });
}

export async function setPlanningTypeFilter(client: AdoClient, config: ConfigManager): Promise<void> {
    const scope = getFirstScope(config);
    if (!scope) return;

    const view = await planningViewPick();
    if (!view) return;

    const schemas = await client.getWorkItemTypeSchemas(scope.project, scope.organization);
    const current = new Set(config.resolvedFilter(view.key).typeFilter);

    const items = schemas.map(s => ({
        label: s.name,
        picked: current.has(s.name)
    }));

    const choices = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select work item types to include (empty = all)',
        canPickMany: true
    });
    if (!choices) return;

    await config.setPlanningViewFilter(view.key, { typeFilter: choices.map(c => c.label) });
}

export async function setPlanningStateFilter(client: AdoClient, config: ConfigManager): Promise<void> {
    const scope = getFirstScope(config);
    if (!scope) return;

    const view = await planningViewPick();
    if (!view) return;

    const schemas = await client.getWorkItemTypeSchemas(scope.project, scope.organization);
    const allStates = [...new Set(schemas.flatMap(s => s.states.map(st => st.name)))].sort();

    const label = await vscode.window.showInputBox({ prompt: 'Section label (e.g. "Active")' });
    if (!label) return;

    const stateItems = allStates.map(s => ({ label: s, picked: false }));
    const selectedStates = await vscode.window.showQuickPick(stateItems, {
        placeHolder: `Select states for section "${label}"`,
        canPickMany: true
    });
    if (!selectedStates || selectedStates.length === 0) return;

    const currentSections = config.planningViews[view.key].sections ?? [];
    const maxOrder = currentSections.reduce((max, s) => Math.max(max, s.order), 0);
    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newSection = {
        id,
        label,
        stateFilter: selectedStates.map(s => s.label),
        order: maxOrder + 1
    };

    const updatedSections = [...currentSections, newSection];
    await config.setPlanningViewSections(view.key, updatedSections);
}

export async function setPlanningTitleFilter(config: ConfigManager): Promise<void> {
    const view = await planningViewPick();
    if (!view) return;

    const current = config.resolvedFilter(view.key).titleFilter;
    const value = await vscode.window.showInputBox({
        prompt: 'Fuzzy title search (empty to clear)',
        value: current,
        placeHolder: 'e.g. login bug'
    });
    if (value === undefined) return;

    await config.setPlanningViewFilter(view.key, { titleFilter: value });
}

export async function setPlanningGlobalFilter(client: AdoClient, config: ConfigManager): Promise<void> {
    const field = await vscode.window.showQuickPick([
        { label: 'Assigned Filter', key: 'assignedFilter' },
        { label: 'Area Path', key: 'areaFilter' },
        { label: 'Iteration Path', key: 'iterationFilter' },
        { label: 'Title Search', key: 'titleFilter' },
        { label: 'Type Filter', key: 'typeFilter' }
    ], { placeHolder: 'Select global filter field to change' });
    if (!field) return;

    const scope = getFirstScope(config);

    switch (field.key) {
        case 'assignedFilter': {
            const choice = await vscode.window.showQuickPick([
                { label: 'All items', value: 'all' },
                { label: 'Assigned to me', value: 'mine' }
            ], { placeHolder: 'Global assigned filter' });
            if (choice) {
                await config.setPlanningGlobalFilter({ assignedFilter: choice.value as 'all' | 'mine' });
            }
            break;
        }
        case 'areaFilter': {
            if (!scope) return;
            const paths = await client.getAreaPaths(scope.project, scope.organization);
            const choice = await vscode.window.showQuickPick([
                { label: '$(close) Clear', path: '' },
                ...paths.map(p => ({ label: p.path, path: p.path }))
            ], { placeHolder: 'Global area path filter' });
            if (choice) {
                await config.setPlanningGlobalFilter({ areaFilter: choice.path });
            }
            break;
        }
        case 'iterationFilter': {
            if (!scope) return;
            const paths = await client.getIterationPaths(scope.project, scope.organization);
            const choice = await vscode.window.showQuickPick([
                { label: '$(close) Clear', path: '' },
                ...paths.map(p => ({ label: p.path, path: p.path }))
            ], { placeHolder: 'Global iteration path filter' });
            if (choice) {
                await config.setPlanningGlobalFilter({ iterationFilter: choice.path });
            }
            break;
        }
        case 'titleFilter': {
            const value = await vscode.window.showInputBox({
                prompt: 'Global fuzzy title search (empty to clear)',
                value: config.planningViews.global.titleFilter
            });
            if (value !== undefined) {
                await config.setPlanningGlobalFilter({ titleFilter: value });
            }
            break;
        }
        case 'typeFilter': {
            if (!scope) return;
            const schemas = await client.getWorkItemTypeSchemas(scope.project, scope.organization);
            const current = new Set(config.planningViews.global.typeFilter);
            const items = schemas.map(s => ({ label: s.name, picked: current.has(s.name) }));
            const choices = await vscode.window.showQuickPick(items, { canPickMany: true, placeHolder: 'Global type filter (empty = all)' });
            if (choices) {
                await config.setPlanningGlobalFilter({ typeFilter: choices.map(c => c.label) });
            }
            break;
        }
    }
}
