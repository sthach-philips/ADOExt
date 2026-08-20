import { describe, it, expect } from 'vitest';
import {
    parsePlanningConfig,
    resolveFilter,
    resolveSections,
    DEFAULT_PLANNING_CONFIG
} from './planningConfig';
import type { PlanningConfig, PlanningViewSection } from './planningConfig';

describe('parsePlanningConfig', () => {
    it('null input returns DEFAULT_PLANNING_CONFIG', () => {
        expect(parsePlanningConfig(null)).toEqual(DEFAULT_PLANNING_CONFIG);
    });

    it('undefined input returns DEFAULT_PLANNING_CONFIG', () => {
        expect(parsePlanningConfig(undefined)).toEqual(DEFAULT_PLANNING_CONFIG);
    });

    it('valid partial input merges with defaults', () => {
        const result = parsePlanningConfig({ global: { assignedFilter: 'mine' } });
        expect(result.global.assignedFilter).toBe('mine');
        expect(result.global.areaFilter).toBe(DEFAULT_PLANNING_CONFIG.global.areaFilter);
    });

    it('invalid assignedFilter value falls back to "all"', () => {
        const result = parsePlanningConfig({ global: { assignedFilter: 'invalid' } });
        expect(result.global.assignedFilter).toBe('all');
    });

    it('non-string areaFilter falls back to default', () => {
        const result = parsePlanningConfig({ global: { areaFilter: 42 } });
        expect(result.global.areaFilter).toBe(DEFAULT_PLANNING_CONFIG.global.areaFilter);
    });

    it('invalid sections are dropped', () => {
        const result = parsePlanningConfig({ backlog: { sections: [{ id: 'x' }], actions: [] } });
        // section missing label/stateFilter/order -> filtered out
        expect(result.backlog.sections).toEqual([]);
    });

    it('valid sections are preserved', () => {
        const section: PlanningViewSection = { id: 's1', label: 'Active', stateFilter: ['Active'], order: 1 };
        const result = parsePlanningConfig({ backlog: { sections: [section], actions: [] } });
        expect(result.backlog.sections).toEqual([section]);
    });
});

describe('resolveFilter', () => {
    it('view-level assignedFilter overrides global', () => {
        const config: PlanningConfig = {
            ...DEFAULT_PLANNING_CONFIG,
            global: { ...DEFAULT_PLANNING_CONFIG.global, assignedFilter: 'all' },
            backlog: { ...DEFAULT_PLANNING_CONFIG.backlog, assignedFilter: 'mine' }
        };
        expect(resolveFilter(config, 'backlog').assignedFilter).toBe('mine');
    });

    it('missing view field falls through to global', () => {
        const config: PlanningConfig = {
            ...DEFAULT_PLANNING_CONFIG,
            global: { ...DEFAULT_PLANNING_CONFIG.global, areaFilter: 'TeamA' },
            backlog: { sections: [], actions: [] } // no areaFilter
        };
        expect(resolveFilter(config, 'backlog').areaFilter).toBe('TeamA');
    });
});

describe('resolveSections', () => {
    it('sorts sections by order ascending', () => {
        const s1: PlanningViewSection = { id: 'a', label: 'A', stateFilter: [], order: 3 };
        const s2: PlanningViewSection = { id: 'b', label: 'B', stateFilter: [], order: 1 };
        const s3: PlanningViewSection = { id: 'c', label: 'C', stateFilter: [], order: 2 };
        const config: PlanningConfig = {
            ...DEFAULT_PLANNING_CONFIG,
            backlog: { sections: [s1, s2, s3], actions: [] }
        };
        const result = resolveSections(config, 'backlog');
        expect(result.map(s => s.order)).toEqual([1, 2, 3]);
    });

    it('empty sections returns empty array', () => {
        expect(resolveSections(DEFAULT_PLANNING_CONFIG, 'backlog')).toEqual([]);
    });
});
