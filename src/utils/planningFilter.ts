import Fuse from 'fuse.js';
import type { WorkItem } from '../api/adoClient';

export function fuzzyFilterItems<T>(
    items: T[],
    titleFilter: string,
    getTitle: (item: T) => string,
    threshold = 0.4
): T[] {
    if (!titleFilter.trim()) return items;
    const fuse = new Fuse(items, {
        keys: [{ name: 'title', getFn: getTitle }],
        threshold,
        includeScore: false,
        ignoreLocation: true
    });
    return fuse.search(titleFilter).map(r => r.item);
}

export function filterWorkItemsByTitle<T extends { workItem: WorkItem }>(
    items: T[],
    titleFilter: string,
    threshold = 0.4
): T[] {
    return fuzzyFilterItems(
        items,
        titleFilter,
        item => (item.workItem.fields?.['System.Title'] as string | undefined) ?? '',
        threshold
    );
}
