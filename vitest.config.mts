import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        root: 'src',
        exclude: ['test/**', '**/node_modules/**']
    }
});
