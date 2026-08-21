import { describe, it, expect } from 'vitest';
import { isToolIdentity, isSystemThread } from './prCommentIdentity';
import type { IdentityRef } from '../api/adoClient';

describe('isToolIdentity', () => {
    it('returns false for undefined', () => {
        expect(isToolIdentity(undefined)).toBe(false);
    });

    it('returns true when isContainer is true', () => {
        expect(isToolIdentity({ isContainer: true } as IdentityRef)).toBe(true);
    });

    it('returns true when descriptor starts with svc.', () => {
        expect(isToolIdentity({ descriptor: 'svc.toolname' } as IdentityRef)).toBe(true);
    });

    it('returns true when displayName starts with Microsoft.VisualStudio.Services.', () => {
        expect(isToolIdentity({ displayName: 'Microsoft.VisualStudio.Services.PullRequest' } as IdentityRef)).toBe(true);
    });

    it('returns false for normal user identity', () => {
        expect(isToolIdentity({ displayName: 'Alice Smith', descriptor: 'aad.abc123' } as IdentityRef)).toBe(false);
    });
});

describe('isSystemThread', () => {
    it('returns true when CodeReviewThreadType property is non-zero', () => {
        const thread = {
            properties: { CodeReviewThreadType: { $value: 1 } },
            comments: [],
        };
        expect(isSystemThread(thread)).toBe(true);
    });

    it('returns false when CodeReviewThreadType is 0', () => {
        const thread = {
            properties: { CodeReviewThreadType: { $value: 0 } },
            comments: [{ author: { displayName: 'Alice' } as IdentityRef, content: 'hello' }],
        };
        expect(isSystemThread(thread)).toBe(false);
    });

    it('returns true when first comment author is Microsoft.VisualStudio.Services.*', () => {
        const thread = {
            comments: [{
                author: { displayName: 'Microsoft.VisualStudio.Services.PullRequest' } as IdentityRef,
                content: 'some content',
            }],
        };
        expect(isSystemThread(thread)).toBe(true);
    });

    it('returns true when content matches "policy status has been updated" pattern', () => {
        const thread = {
            comments: [{
                author: { displayName: 'Bot' } as IdentityRef,
                content: 'Policy status has been updated.',
            }],
        };
        expect(isSystemThread(thread)).toBe(true);
    });

    it('returns true for "voted on this pull request" content pattern', () => {
        const thread = {
            comments: [{
                author: { displayName: 'Alice' } as IdentityRef,
                content: 'voted on this pull request',
            }],
        };
        expect(isSystemThread(thread)).toBe(true);
    });

    it('returns false for normal user thread', () => {
        const thread = {
            comments: [{
                author: { displayName: 'Alice Smith' } as IdentityRef,
                content: 'Looks good to me!',
            }],
        };
        expect(isSystemThread(thread)).toBe(false);
    });

    it('returns false for thread with no comments', () => {
        expect(isSystemThread({ comments: [] })).toBe(false);
        expect(isSystemThread({})).toBe(false);
    });
});
