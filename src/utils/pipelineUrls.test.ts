import { describe, it, expect } from 'vitest';
import { pipelineRunUrl, agentPoolUrl, agentQueueUrl } from './pipelineUrls';

describe('pipelineRunUrl', () => {
    it('defaults to results view', () => {
        const url = pipelineRunUrl('myorg', 'myproject', 42);
        expect(url).toBe('https://dev.azure.com/myorg/myproject/_build/results?buildId=42&view=results');
    });

    it('explicit logs view', () => {
        const url = pipelineRunUrl('myorg', 'myproject', 42, 'logs');
        expect(url).toBe('https://dev.azure.com/myorg/myproject/_build/results?buildId=42&view=logs');
    });

    it('percent-encodes special chars in org/project', () => {
        const url = pipelineRunUrl('my org', 'my/project', 1);
        expect(url).toContain('my%20org');
        expect(url).toContain('my%2Fproject');
    });
});

describe('agentPoolUrl', () => {
    it('returns base URL without poolId', () => {
        expect(agentPoolUrl('myorg')).toBe('https://dev.azure.com/myorg/_settings/agentpools');
    });

    it('appends poolId param when provided', () => {
        expect(agentPoolUrl('myorg', 5)).toBe('https://dev.azure.com/myorg/_settings/agentpools?poolId=5');
    });

    it('percent-encodes special chars in org', () => {
        const url = agentPoolUrl('my org');
        expect(url).toContain('my%20org');
    });
});

describe('agentQueueUrl', () => {
    it('returns base URL without queueId', () => {
        expect(agentQueueUrl('myorg', 'proj')).toBe('https://dev.azure.com/myorg/proj/_settings/agentqueues');
    });

    it('appends queueId param when provided', () => {
        expect(agentQueueUrl('myorg', 'proj', 7)).toBe('https://dev.azure.com/myorg/proj/_settings/agentqueues?queueId=7');
    });

    it('percent-encodes special chars in org/project', () => {
        const url = agentQueueUrl('my org', 'my/proj');
        expect(url).toContain('my%20org');
        expect(url).toContain('my%2Fproj');
    });
});
