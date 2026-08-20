import { describe, it, expect } from 'vitest';
import { fuzzyFilterItems, filterWorkItemsByTitle } from './planningFilter';
import type { WorkItem } from 'azure-devops-node-api/interfaces/WorkItemTrackingInterfaces';

describe('fuzzyFilterItems', () => {
    const items = ['Authentication bug', 'Build pipeline', 'Deploy script'];

    it('empty filter string returns all items', () => {
        expect(fuzzyFilterItems(items, '', x => x)).toEqual(items);
    });

    it('matching filter returns subset', () => {
        const result = fuzzyFilterItems(items, 'build', x => x);
        expect(result.length).toBeGreaterThan(0);
        expect(result.some(r => r.toLowerCase().includes('build'))).toBe(true);
    });

    it('non-matching filter returns empty', () => {
        const result = fuzzyFilterItems(items, 'zzzzzzzzzzz', x => x);
        expect(result).toEqual([]);
    });

    it('threshold affects results (strict threshold excludes weak matches)', () => {
        // With threshold=0.0 (exact match only), fuzzy match is stricter
        const loose = fuzzyFilterItems(items, 'deploy', x => x, 0.8);
        const strict = fuzzyFilterItems(items, 'deploy', x => x, 0.0);
        // loose threshold allows more results; strict may allow fewer
        expect(loose.length).toBeGreaterThanOrEqual(strict.length);
    });
});

describe('filterWorkItemsByTitle', () => {
    function makeItem(title: string): { workItem: WorkItem } {
        return { workItem: { fields: { 'System.Title': title } } as WorkItem };
    }

    it('empty filter returns all items', () => {
        const items = [makeItem('Alpha'), makeItem('Beta')];
        expect(filterWorkItemsByTitle(items, '')).toEqual(items);
    });

    it('matching filter returns subset', () => {
        const items = [makeItem('Fix auth bug'), makeItem('Update pipeline'), makeItem('Deploy script')];
        const result = filterWorkItemsByTitle(items, 'pipeline');
        expect(result.length).toBeGreaterThan(0);
    });

    it('non-matching filter returns empty', () => {
        const items = [makeItem('Alpha'), makeItem('Beta')];
        const result = filterWorkItemsByTitle(items, 'zzzzzzzzz');
        expect(result).toEqual([]);
    });
});
