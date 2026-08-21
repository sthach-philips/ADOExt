import { describe, it, expect } from 'vitest';
import { classifyAdoAuthError, formatAdoError, adoErrorFingerprint } from './adoErrors';

describe('classifyAdoAuthError', () => {
    it('401 status -> refreshable', () => {
        const result = classifyAdoAuthError({ statusCode: 401, message: 'Unauthorized' });
        expect(result.kind).toBe('refreshable');
        expect(result.statusCode).toBe(401);
    });

    it('403 status -> forbidden-refresh-candidate', () => {
        const result = classifyAdoAuthError({ statusCode: 403, message: 'Forbidden' });
        expect(result.kind).toBe('forbidden-refresh-candidate');
        expect(result.statusCode).toBe(403);
    });

    it('error with "unauthorized" in message -> refreshable', () => {
        const result = classifyAdoAuthError(new Error('unauthorized access'));
        expect(result.kind).toBe('refreshable');
    });

    it('error with "token expired" in message -> refreshable', () => {
        const result = classifyAdoAuthError(new Error('bearer token expired'));
        expect(result.kind).toBe('refreshable');
    });

    it('normal error -> none', () => {
        const result = classifyAdoAuthError(new Error('something went wrong'));
        expect(result.kind).toBe('none');
    });

    it('500 status -> none', () => {
        const result = classifyAdoAuthError({ statusCode: 500, message: 'Internal Server Error' });
        expect(result.kind).toBe('none');
        expect(result.statusCode).toBe(500);
    });
});

describe('formatAdoError', () => {
    it('Error instance returns message', () => {
        expect(formatAdoError(new Error('oops'))).toBe('oops');
    });

    it('string returns itself', () => {
        expect(formatAdoError('plain string error')).toBe('plain string error');
    });

    it('object with message field returns that message', () => {
        expect(formatAdoError({ message: 'nested message' })).toBe('nested message');
    });

    it('object with body JSON containing message extracts it', () => {
        const err = { body: JSON.stringify({ message: 'from body' }) };
        expect(formatAdoError(err)).toBe('from body');
    });
});

describe('adoErrorFingerprint', () => {
    it('stable across identical errors', () => {
        const err = new Error('auth failed');
        const fp1 = adoErrorFingerprint(err, 'mySource');
        const fp2 = adoErrorFingerprint(err, 'mySource');
        expect(fp1).toBe(fp2);
    });

    it('different sources produce different fingerprints', () => {
        const err = new Error('auth failed');
        expect(adoErrorFingerprint(err, 'sourceA')).not.toBe(adoErrorFingerprint(err, 'sourceB'));
    });

    it('different error kinds produce different fingerprints', () => {
        const fp401 = adoErrorFingerprint({ statusCode: 401 }, 'src');
        const fp403 = adoErrorFingerprint({ statusCode: 403 }, 'src');
        expect(fp401).not.toBe(fp403);
    });
});
