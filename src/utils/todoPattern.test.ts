import { describe, it, expect } from 'vitest';
import { TODO_COMMENT_PATTERN } from './todoPattern';

describe('TODO_COMMENT_PATTERN', () => {
    it('matches // TODO: and captures text', () => {
        const m = '// TODO: fix this'.match(TODO_COMMENT_PATTERN);
        expect(m).not.toBeNull();
        expect(m![1]).toBe('fix this');
    });

    it('matches // TODO(user): and captures text after colon', () => {
        const m = '// TODO(user): fix this'.match(TODO_COMMENT_PATTERN);
        expect(m).not.toBeNull();
        expect(m![1]).toBe('fix this');
    });

    it('matches # TODO: (hash comment)', () => {
        const m = '# TODO: fix this'.match(TODO_COMMENT_PATTERN);
        expect(m).not.toBeNull();
        expect(m![1]).toBe('fix this');
    });

    it('matches /* TODO: */ block comment', () => {
        const m = '/* TODO: fix this */'.match(TODO_COMMENT_PATTERN);
        expect(m).not.toBeNull();
        expect(m![1]).toBe('fix this');
    });

    it('does not match TODO inside string literal (no leading comment marker)', () => {
        expect('const x = "TODO: not a comment"'.match(TODO_COMMENT_PATTERN)).toBeNull();
    });

    it('is case insensitive for todo keyword', () => {
        const m = '// todo: works'.match(TODO_COMMENT_PATTERN);
        expect(m).not.toBeNull();
        expect(m![1]).toBe('works');
    });

    it('captures text after colon+space', () => {
        const m = '// TODO: capture me'.match(TODO_COMMENT_PATTERN);
        expect(m![1]).toBe('capture me');
    });
});
