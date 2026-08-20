// Verify that lowdb (ESM-only) bundles correctly into CJS via esbuild.
// Run: node tests/bundle-compat/lowdb-cjs.mjs

import { build } from 'esbuild';
import { execSync } from 'child_process';
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const tmp = mkdtempSync(join(tmpdir(), 'lowdb-compat-'));
const entry = join(tmp, 'entry.ts');
const out = join(tmp, 'out.cjs');

// Minimal lowdb usage matching SharedCache pattern
writeFileSync(entry, `
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';

interface CacheData { entries: Record<string, { value: string; expiresAt: number }> }

async function main() {
    const file = join('${tmp.replace(/\\/g, '\\\\')}', 'test-db.json');
    const db = new Low<CacheData>(new JSONFile(file), { entries: {} });
    await db.read();
    db.data.entries['k1'] = { value: 'hello', expiresAt: Date.now() + 60000 };
    await db.write();
    await db.read();
    if (db.data.entries['k1'].value !== 'hello') {
        throw new Error('roundtrip failed');
    }
    console.log('PASS: lowdb ESM imports resolved in bundled CJS context');
}
main();
`);

// Bundle with same config as extension host
const projectRoot = new URL('../../', import.meta.url).pathname;
await build({
    entryPoints: [entry],
    outfile: out,
    bundle: true,
    platform: 'node',
    format: 'cjs',
    target: 'node18',
    sourcemap: false,
    minify: false,
    logLevel: 'silent',
    nodePaths: [join(projectRoot, 'node_modules')],
});

// Execute the bundled CJS output
try {
    execSync(`node "${out}"`, { stdio: 'inherit' });
} finally {
    rmSync(tmp, { recursive: true, force: true });
}
