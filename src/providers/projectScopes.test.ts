import { describe, it, expect } from 'vitest';
import { scopeKey, scopeLabel, resolveProjectScopes, forEachScope } from './projectScopes';

const SEP = String.fromCharCode(0);

describe('scopeKey', () => {
    it('joins organization and project with null byte', () => {
        expect(scopeKey({ organization: 'myorg', project: 'myproject' })).toBe(`myorg${SEP}myproject`);
    });
});

describe('scopeLabel', () => {
    it('joins organization and project with slash', () => {
        expect(scopeLabel({ organization: 'myorg', project: 'myproject' })).toBe('myorg/myproject');
    });
});

describe('resolveProjectScopes', () => {
    const stubClient = {
        listProjects: async (_org: string) => [{ name: 'ProjectA' }, { name: 'ProjectB' }],
    } as any;

    it('returns explicit project list as scopes', async () => {
        const config = {
            selectedOrganizations: ['myorg'],
            getProjectSelection: () => ['Alpha', 'Beta'],
        } as any;
        const scopes = await resolveProjectScopes(stubClient, config);
        expect(scopes).toEqual([
            { organization: 'myorg', project: 'Alpha' },
            { organization: 'myorg', project: 'Beta' },
        ]);
    });

    it('expands wildcard * via listProjects', async () => {
        const config = {
            selectedOrganizations: ['myorg'],
            getProjectSelection: () => ['*'],
        } as any;
        const scopes = await resolveProjectScopes(stubClient, config);
        expect(scopes).toEqual([
            { organization: 'myorg', project: 'ProjectA' },
            { organization: 'myorg', project: 'ProjectB' },
        ]);
    });

    it('resolves multiple orgs independently', async () => {
        const config = {
            selectedOrganizations: ['org1', 'org2'],
            getProjectSelection: () => ['MyProj'],
        } as any;
        const scopes = await resolveProjectScopes(stubClient, config);
        expect(scopes).toEqual([
            { organization: 'org1', project: 'MyProj' },
            { organization: 'org2', project: 'MyProj' },
        ]);
    });

    it('returns [] when selectedOrganizations is empty', async () => {
        const config = {
            selectedOrganizations: [],
            getProjectSelection: () => ['MyProj'],
        } as any;
        const scopes = await resolveProjectScopes(stubClient, config);
        expect(scopes).toEqual([]);
    });
});

describe('forEachScope', () => {
    const stubClient = {
        listProjects: async (_org: string) => [{ name: 'ProjectA' }],
    } as any;

    it('calls fetcher for each scope and flattens results', async () => {
        const config = {
            selectedOrganizations: ['myorg'],
            getProjectSelection: () => ['Proj1', 'Proj2'],
        } as any;
        const fetcher = async (scope: { organization: string; project: string }) => [scope.project];
        const { items } = await forEachScope(stubClient, config, fetcher);
        expect(items.sort()).toEqual(['Proj1', 'Proj2']);
    });

    it('returns empty items when no scopes', async () => {
        const config = {
            selectedOrganizations: [],
            getProjectSelection: () => [],
        } as any;
        const fetcher = async () => ['should not be called'];
        const { items, scopes } = await forEachScope(stubClient, config, fetcher);
        expect(items).toEqual([]);
        expect(scopes).toEqual([]);
    });

    it('passes correct scope object to fetcher', async () => {
        const config = {
            selectedOrganizations: ['myorg'],
            getProjectSelection: () => ['Proj1'],
        } as any;
        const seen: { organization: string; project: string }[] = [];
        await forEachScope(stubClient, config, async (scope) => {
            seen.push(scope);
            return [];
        });
        expect(seen).toEqual([{ organization: 'myorg', project: 'Proj1' }]);
    });
});
