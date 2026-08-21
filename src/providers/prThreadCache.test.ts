import { describe, it, expect, vi, afterEach } from 'vitest';
import { PrThreadCache, type PrThreadKey } from './prThreadCache';

afterEach(() => {
    vi.useRealTimers();
});

const key: PrThreadKey = {
    organization: 'myorg',
    project: 'myproject',
    repositoryId: 'repo1',
    pullRequestId: 42,
};

describe('PrThreadCache', () => {
    it('get returns undefined for missing key', () => {
        const cache = new PrThreadCache();
        expect(cache.get(key)).toBeUndefined();
    });

    it('set then get returns threads', () => {
        const cache = new PrThreadCache();
        const threads = [{ id: 1 }] as any;
        cache.set(key, threads);
        expect(cache.get(key)).toBe(threads);
    });

    it('expired entry returns undefined after advancing past TTL', () => {
        vi.useFakeTimers();
        const cache = new PrThreadCache(500);
        cache.set(key, [] as any);
        vi.advanceTimersByTime(501);
        expect(cache.get(key)).toBeUndefined();
    });

    it('getOrFetch calls fetcher on cache miss and returns result', async () => {
        const cache = new PrThreadCache();
        const threads = [{ id: 1 }] as any;
        const fetcher = vi.fn(async () => threads);
        const result = await cache.getOrFetch(key, fetcher);
        expect(fetcher).toHaveBeenCalledTimes(1);
        expect(result).toBe(threads);
    });

    it('getOrFetch returns cached value on hit without calling fetcher again', async () => {
        const cache = new PrThreadCache();
        const threads = [{ id: 1 }] as any;
        const fetcher = vi.fn(async () => threads);
        await cache.getOrFetch(key, fetcher);
        await cache.getOrFetch(key, fetcher);
        expect(fetcher).toHaveBeenCalledTimes(1);
    });

    it('getOrFetch deduplicates concurrent calls (fetcher called once)', async () => {
        const cache = new PrThreadCache();
        const threads = [{ id: 2 }] as any;
        const fetcher = vi.fn(async () => threads);
        // Both calls started before any await resolves - second sees inflight promise
        const [r1, r2] = await Promise.all([
            cache.getOrFetch(key, fetcher),
            cache.getOrFetch(key, fetcher),
        ]);
        expect(fetcher).toHaveBeenCalledTimes(1);
        expect(r1).toEqual(r2);
    });

    it('invalidate removes the entry', () => {
        const cache = new PrThreadCache();
        cache.set(key, [{ id: 1 }] as any);
        cache.invalidate(key);
        expect(cache.get(key)).toBeUndefined();
    });

    it('clear removes all entries and inflight', async () => {
        const cache = new PrThreadCache();
        cache.set(key, [{ id: 1 }] as any);
        const key2: PrThreadKey = { ...key, pullRequestId: 99 };
        cache.set(key2, [{ id: 2 }] as any);
        cache.clear();
        expect(cache.get(key)).toBeUndefined();
        expect(cache.get(key2)).toBeUndefined();
    });
});
