import { describe, it, expect } from 'vitest';
import { mapWithConcurrencyLimit } from './async';

describe('mapWithConcurrencyLimit', () => {
    it('empty input returns []', async () => {
        const result = await mapWithConcurrencyLimit([], 3, async (x) => x);
        expect(result).toEqual([]);
    });

    it('maps all items correctly', async () => {
        const result = await mapWithConcurrencyLimit([1, 2, 3], 2, async (x) => x * 2);
        expect(result).toEqual([2, 4, 6]);
    });

    it('passes correct index to mapper', async () => {
        const indices: number[] = [];
        await mapWithConcurrencyLimit(['a', 'b', 'c'], 3, async (_item, idx) => {
            indices.push(idx);
        });
        expect(indices.sort()).toEqual([0, 1, 2]);
    });

    it('respects concurrency limit', async () => {
        let active = 0;
        let maxActive = 0;
        const limit = 2;
        const items = [1, 2, 3, 4, 5];

        await mapWithConcurrencyLimit(items, limit, async () => {
            active++;
            maxActive = Math.max(maxActive, active);
            await new Promise<void>(resolve => setTimeout(resolve, 10));
            active--;
        });

        expect(maxActive).toBeLessThanOrEqual(limit);
    });

    it('propagates mapper errors', async () => {
        await expect(
            mapWithConcurrencyLimit([1, 2, 3], 2, async (x) => {
                if (x === 2) throw new Error('boom');
                return x;
            })
        ).rejects.toThrow('boom');
    });
});
