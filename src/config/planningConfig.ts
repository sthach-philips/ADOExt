export type PlanningViewAction = string;

export interface PlanningViewSection {
    id: string;
    label: string;
    stateFilter: string[];
    order: number;
    collapsed?: boolean;
}

export interface PlanningFilterFields {
    assignedFilter: 'all' | 'mine';
    areaFilter: string;
    iterationFilter: string;
    titleFilter: string;
    typeFilter: string[];
    showUnmatchedStates: boolean;
}

export type PlanningGlobalFilter = PlanningFilterFields;

export type PlanningViewConfig = Partial<PlanningFilterFields> & {
    sections: PlanningViewSection[];
    actions: PlanningViewAction[];
};

export interface PlanningConfig {
    global: PlanningGlobalFilter;
    workItems: PlanningViewConfig;
    backlog: PlanningViewConfig;
    sprints: PlanningViewConfig;
    boards: PlanningViewConfig;
}

export type PlanningViewKey = keyof Omit<PlanningConfig, 'global'>;

export const DEFAULT_PLANNING_CONFIG: PlanningConfig = {
    global: {
        assignedFilter: 'all',
        areaFilter: '',
        iterationFilter: '',
        titleFilter: '',
        typeFilter: [],
        showUnmatchedStates: true
    },
    workItems: {
        sections: [],
        actions: [
            'adoext.refreshWorkItems',
            'adoext.selectWorkItemQuery',
            'adoext.openSavedQuery',
            'adoext.saveWorkItemQuery',
            'adoext.createWorkItem',
            'adoext.setWorkItemFilter',
            'adoext.setWorkItemSort',
            'adoext.toggleHideDoneWorkItems'
        ]
    },
    backlog: {
        sections: [],
        actions: [
            'adoext.openBacklogView',
            'adoext.refreshBacklog',
            'adoext.setPlanningAssignedFilter',
            'adoext.setPlanningAreaFilter',
            'adoext.setPlanningTitleFilter'
        ]
    },
    sprints: {
        sections: [],
        actions: [
            'adoext.openSprintView',
            'adoext.refreshSprints',
            'adoext.setPlanningAssignedFilter',
            'adoext.setPlanningIterationFilter',
            'adoext.setPlanningAreaFilter',
            'adoext.setPlanningTitleFilter'
        ]
    },
    boards: {
        sections: [],
        actions: [
            'adoext.openBoardView',
            'adoext.refreshBoards',
            'adoext.setPlanningAssignedFilter',
            'adoext.setPlanningStateFilter',
            'adoext.setPlanningAreaFilter',
            'adoext.setPlanningTitleFilter'
        ]
    }
};

export function parsePlanningConfig(raw: unknown): PlanningConfig {
    if (!raw || typeof raw !== 'object') {
        return DEFAULT_PLANNING_CONFIG;
    }
    const obj = raw as Record<string, unknown>;
    return {
        global: parseGlobalFilter(obj.global),
        workItems: parseViewConfig(obj.workItems),
        backlog: parseViewConfig(obj.backlog),
        sprints: parseViewConfig(obj.sprints),
        boards: parseViewConfig(obj.boards)
    };
}

function parseGlobalFilter(raw: unknown): PlanningGlobalFilter {
    const defaults = DEFAULT_PLANNING_CONFIG.global;
    if (!raw || typeof raw !== 'object') {
        return defaults;
    }
    const obj = raw as Record<string, unknown>;
    return {
        assignedFilter: obj.assignedFilter === 'mine' ? 'mine' : 'all',
        areaFilter: typeof obj.areaFilter === 'string' ? obj.areaFilter : defaults.areaFilter,
        iterationFilter: typeof obj.iterationFilter === 'string' ? obj.iterationFilter : defaults.iterationFilter,
        titleFilter: typeof obj.titleFilter === 'string' ? obj.titleFilter : defaults.titleFilter,
        typeFilter: Array.isArray(obj.typeFilter) ? obj.typeFilter.filter((v): v is string => typeof v === 'string') : defaults.typeFilter,
        showUnmatchedStates: typeof obj.showUnmatchedStates === 'boolean' ? obj.showUnmatchedStates : defaults.showUnmatchedStates
    };
}

function parseViewConfig(raw: unknown): PlanningViewConfig {
    if (!raw || typeof raw !== 'object') {
        return { sections: [], actions: [] };
    }
    const obj = raw as Record<string, unknown>;
    const sections = Array.isArray(obj.sections)
        ? obj.sections.filter(isValidSection)
        : [];
    const actions = Array.isArray(obj.actions)
        ? obj.actions.filter((v): v is string => typeof v === 'string')
        : [];

    const result: PlanningViewConfig = { sections, actions };

    if (obj.assignedFilter === 'all' || obj.assignedFilter === 'mine') {
        result.assignedFilter = obj.assignedFilter;
    }
    if (typeof obj.areaFilter === 'string') {
        result.areaFilter = obj.areaFilter;
    }
    if (typeof obj.iterationFilter === 'string') {
        result.iterationFilter = obj.iterationFilter;
    }
    if (typeof obj.titleFilter === 'string') {
        result.titleFilter = obj.titleFilter;
    }
    if (Array.isArray(obj.typeFilter)) {
        result.typeFilter = obj.typeFilter.filter((v): v is string => typeof v === 'string');
    }
    if (typeof obj.showUnmatchedStates === 'boolean') {
        result.showUnmatchedStates = obj.showUnmatchedStates;
    }

    return result;
}

function isValidSection(raw: unknown): raw is PlanningViewSection {
    if (!raw || typeof raw !== 'object') return false;
    const obj = raw as Record<string, unknown>;
    return typeof obj.id === 'string'
        && typeof obj.label === 'string'
        && Array.isArray(obj.stateFilter)
        && typeof obj.order === 'number';
}

export function resolveFilter(config: PlanningConfig, view: PlanningViewKey): PlanningFilterFields {
    const g = config.global;
    const v = config[view];
    return {
        assignedFilter: v.assignedFilter ?? g.assignedFilter,
        areaFilter: v.areaFilter ?? g.areaFilter,
        iterationFilter: v.iterationFilter ?? g.iterationFilter,
        titleFilter: v.titleFilter ?? g.titleFilter,
        typeFilter: v.typeFilter ?? g.typeFilter,
        showUnmatchedStates: v.showUnmatchedStates ?? g.showUnmatchedStates
    };
}

export function resolveSections(config: PlanningConfig, view: PlanningViewKey): PlanningViewSection[] {
    return [...config[view].sections].sort((a, b) => a.order - b.order);
}
