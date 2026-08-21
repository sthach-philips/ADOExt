import * as assert from 'assert';
import * as vscode from 'vscode';

// ponytail: uses MarcKassubeck.adoext -- the actual publisher from package.json
suite('Extension Activation', () => {
    test('extension is present', () => {
        const ext = vscode.extensions.getExtension('MarcKassubeck.adoext');
        assert.ok(ext, 'Extension not found');
    });

    test('extension activates without error', async () => {
        const ext = vscode.extensions.getExtension('MarcKassubeck.adoext');
        assert.ok(ext);
        await ext.activate();
        assert.strictEqual(ext.isActive, true);
    });
});
