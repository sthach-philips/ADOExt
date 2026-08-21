import { describe, it, expect } from 'vitest';
import { ADO_BASE_URL, isAdoUrl } from './adoUrls';

describe('ADO_BASE_URL', () => {
    it('equals expected value', () => {
        expect(ADO_BASE_URL).toBe('https://dev.azure.com');
    });
});

describe('isAdoUrl', () => {
    it('matches dev.azure.com URL', () => {
        expect(isAdoUrl('https://dev.azure.com/org/project')).toBe(true);
    });

    it('matches org.visualstudio.com URL', () => {
        expect(isAdoUrl('https://myorg.visualstudio.com/project')).toBe(true);
    });

    it('matches subdomain of dev.azure.com', () => {
        expect(isAdoUrl('https://sub.dev.azure.com/org/project')).toBe(true);
    });

    it('rejects http (non-https)', () => {
        expect(isAdoUrl('http://dev.azure.com/org/project')).toBe(false);
    });

    it('rejects github.com', () => {
        expect(isAdoUrl('https://github.com/org/project')).toBe(false);
    });

    it('rejects empty string', () => {
        expect(isAdoUrl('')).toBe(false);
    });
});
