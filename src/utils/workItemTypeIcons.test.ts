import { describe, it, expect } from 'vitest';
import { normalizeWorkItemTypeName, workItemTypeScopeKey, bundledWorkItemTypeIconFile } from './workItemTypeIcons';

describe('normalizeWorkItemTypeName', () => {
    it('trims and lowercases', () => {
        expect(normalizeWorkItemTypeName('  Bug  ')).toBe('bug');
        expect(normalizeWorkItemTypeName('User Story')).toBe('user story');
    });
});

describe('workItemTypeScopeKey', () => {
    const SEP = String.fromCharCode(0);

    it('joins org and project with null byte separator', () => {
        expect(workItemTypeScopeKey('myorg', 'myproject')).toBe(`myorg${SEP}myproject`);
    });

    it('handles undefined org (empty string prefix)', () => {
        expect(workItemTypeScopeKey(undefined, 'myproject')).toBe(`${SEP}myproject`);
    });
});

describe('bundledWorkItemTypeIconFile', () => {
    const cases: [string, string][] = [
        ['bug', 'bug.svg'],
        ['task', 'task.svg'],
        ['epic', 'epic.svg'],
        ['feature', 'feature.svg'],
        ['user story', 'user-story.svg'],
        ['product backlog item', 'product-backlog-item.svg'],
        ['pbi', 'product-backlog-item.svg'],
        ['issue', 'issue.svg'],
    ];

    for (const [type, expected] of cases) {
        it(`returns ${expected} for "${type}"`, () => {
            expect(bundledWorkItemTypeIconFile(type)).toBe(expected);
        });
    }

    it('returns undefined for unknown type', () => {
        expect(bundledWorkItemTypeIconFile('unknown')).toBeUndefined();
    });

    it('is case insensitive (Bug and BUG both work)', () => {
        expect(bundledWorkItemTypeIconFile('Bug')).toBe('bug.svg');
        expect(bundledWorkItemTypeIconFile('BUG')).toBe('bug.svg');
    });
});
