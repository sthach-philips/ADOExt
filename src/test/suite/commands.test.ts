import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

suite('Command Registration', () => {
    let declaredCommands: string[] = [];

    suiteSetup(async () => {
        const ext = vscode.extensions.getExtension('MarcKassubeck.adoext');
        if (ext && !ext.isActive) {
            await ext.activate();
        }

        const pkgPath = path.resolve(__dirname, '../../../package.json');
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        declaredCommands = (pkg.contributes?.commands ?? []).map((c: { command: string }) => c.command);
    });

    test('all declared commands are registered', async () => {
        const allCommands = await vscode.commands.getCommands(true);
        const missing = declaredCommands.filter(cmd => !allCommands.includes(cmd));
        assert.deepStrictEqual(missing, [], `Commands declared in package.json but not registered: ${missing.join(', ')}`);
    });
});
