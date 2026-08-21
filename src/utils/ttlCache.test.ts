import { describe, it, expect, vi, afterEach } from 'vitest';
import { TtlCache } from './ttlCache';

afterEach(() => {
    vi.useRealTimers();
});

describe('TtlCache', () => {
    it('get returns undefined for missing key', () => {
        const cache = new TtlCache<string>(1000);
        expect(cache.get('missing')).toBeUndefined();
    });

    it('set then get returns value', () => {
        const cache = new TtlCache<string>(1000);
        cache.set('k', 'v');
        expect(cache.get('k')).toBe('v');
    });

    it('expired entry returns undefined', () => {
        vi.useFakeTimers();
        const cache = new TtlCache<string>(500);
        cache.set('k', 'v');
        vi.advanceTimersByTime(501);
        expect(cache.get('k')).toBeUndefined();
    });

    it('expired entry is deleted from internal map', () => {
        vi.useFakeTimers();
        const cache = new TtlCache<string>(500);
        cache.set('k', 'v');
        vi.advanceTimersByTime(501);
        cache.get('k'); // triggers deletion
        // has() calls get() so also returns false and confirming deletion
        expect(cache.has('k')).toBe(false);
    });

    it('clear removes all entries', () => {
        const cache = new TtlCache<number>(1000);
        cache.set('a', 1);
        cache.set('b', 2);
        cache.clear();
        expect(cache.get('a')).toBeUndefined();
        expect(cache.get('b')).toBeUndefined();
    });

    it('has returns true for live entry, false for missing', () => {
        const cache = new TtlCache<string>(1000);
        expect(cache.has('x')).toBe(false);
        cache.set('x', 'y');
        expect(cache.has('x')).toBe(true);
    });
});
