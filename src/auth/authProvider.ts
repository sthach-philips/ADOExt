import * as vscode from 'vscode';
import { PublicClientApplication } from '@azure/msal-node';
import { AzureCliCredential } from '@azure/identity';
import { showErrorMessage } from '../utils/notifications';

const ADO_SCOPE = '499b84ac-1321-427f-aa17-267ca6975798/.default';
const MSAL_CLIENT_ID = '0d50963b-7bb9-4fe7-94c7-a99af00b5136';
const MSAL_AUTHORITY = 'https://login.microsoftonline.com/common';

export type AuthMethod = 'vscode' | 'msal' | 'azcli' | 'pat';

export class AuthProvider {
    private _session: vscode.AuthenticationSession | undefined;
    private _msalToken: string | undefined;
    private _msalApp: PublicClientApplication | undefined;
    private _msalAccountId: unknown = null;
    private _method: AuthMethod = 'vscode';

    private getConfiguredMethod(): AuthMethod {
        return vscode.workspace.getConfiguration('adoext').get<AuthMethod>('authMethod') ?? 'vscode';
    }

    async tryRestoreSession(): Promise<boolean> {
        this._method = this.getConfiguredMethod();
        switch (this._method) {
            case 'vscode':
                return this._tryRestoreVscode();
            case 'msal':
                return this._tryRestoreMsal();
            case 'azcli':
                return this._tryAzCli();
            case 'pat':
                return this._tryPat();
        }
    }

    async signIn(): Promise<boolean> {
        this._method = this.getConfiguredMethod();
        try {
            switch (this._method) {
                case 'vscode':
                    return this._signInVscode(false);
                case 'msal':
                    return this._signInMsal();
                case 'azcli':
                    return this._tryAzCli();
                case 'pat':
                    return this._tryPat();
            }
        } catch (err) {
            showErrorMessage(`Failed to sign in (${this._method}): ${err}`);
            return false;
        }
    }

    async reauthenticate(): Promise<boolean> {
        this._method = this.getConfiguredMethod();
        try {
            switch (this._method) {
                case 'vscode':
                    return this._signInVscode(true);
                case 'msal':
                    this._msalAccountId = null;
                    return this._signInMsal();
                case 'azcli':
                    return this._tryAzCli();
                case 'pat':
                    return this._tryPat();
            }
        } catch (err) {
            showErrorMessage(`Failed to sign in (${this._method}): ${err}`);
            return false;
        }
    }

    async refreshSession(): Promise<'refreshed' | 'unchanged' | 'missing'> {
        const prevToken = this.accessToken;
        const ok = await this.tryRestoreSession();
        if (!ok) { return 'missing'; }
        return this.accessToken !== prevToken ? 'refreshed' : 'unchanged';
    }

    signOut(): void {
        this._session = undefined;
        this._msalToken = undefined;
        this._msalAccountId = null;
    }

    get isSignedIn(): boolean {
        return this._session !== undefined || this._msalToken !== undefined;
    }

    get accessToken(): string | undefined {
        return this._session?.accessToken ?? this._msalToken;
    }

    get accountName(): string | undefined {
        return this._session?.account.label ?? (this._msalToken ? `(${this._method})` : undefined);
    }

    get accountId(): string | undefined {
        return this._session?.account.id;
    }

    // --- VS Code built-in auth ---

    private async _tryRestoreVscode(): Promise<boolean> {
        try {
            this._session = await vscode.authentication.getSession(
                'microsoft', [ADO_SCOPE], { createIfNone: false, silent: true }
            );
            return this._session !== undefined;
        } catch { return false; }
    }

    private async _signInVscode(forceNew: boolean): Promise<boolean> {
        if (forceNew) {
            this._session = await vscode.authentication.getSession(
                'microsoft', [ADO_SCOPE],
                { forceNewSession: { detail: 'Azure DevOps rejected the current token. Sign in again.' } }
            );
        } else {
            this._session = await vscode.authentication.getSession(
                'microsoft', [ADO_SCOPE], { createIfNone: true }
            );
        }
        return this._session !== undefined;
    }

    // --- MSAL interactive (same as @azure-devops/mcp) ---

    private getMsalApp(): PublicClientApplication {
        if (!this._msalApp) {
            this._msalApp = new PublicClientApplication({
                auth: { clientId: MSAL_CLIENT_ID, authority: MSAL_AUTHORITY },
            });
        }
        return this._msalApp;
    }

    private async _tryRestoreMsal(): Promise<boolean> {
        if (!this._msalAccountId) { return false; }
        try {
            const app = this.getMsalApp();
            const result = await app.acquireTokenSilent({
                scopes: [ADO_SCOPE],
                account: this._msalAccountId as Parameters<typeof app.acquireTokenSilent>[0]['account'],
            });
            if (result?.accessToken) {
                this._msalToken = result.accessToken;
                return true;
            }
        } catch { /* fall through */ }
        return false;
    }

    private async _signInMsal(): Promise<boolean> {
        const restored = await this._tryRestoreMsal();
        if (restored) { return true; }

        const app = this.getMsalApp();
        const open = (await import('open')).default;
        const result = await app.acquireTokenInteractive({
            scopes: [ADO_SCOPE],
            openBrowser: async (url) => { open(url); },
        });
        if (result?.accessToken) {
            this._msalToken = result.accessToken;
            this._msalAccountId = result.account;
            return true;
        }
        return false;
    }

    // --- Azure CLI credential ---

    private async _tryAzCli(): Promise<boolean> {
        try {
            const cred = new AzureCliCredential();
            const result = await cred.getToken([ADO_SCOPE]);
            if (result?.token) {
                this._msalToken = result.token;
                return true;
            }
        } catch (err) {
            showErrorMessage(`az cli auth failed: ${err}`);
        }
        return false;
    }

    // --- PAT from environment ---

    private _tryPat(): Promise<boolean> {
        const pat = process.env['AZURE_DEVOPS_PAT'];
        if (pat) {
            this._msalToken = pat;
            return Promise.resolve(true);
        }
        showErrorMessage('AZURE_DEVOPS_PAT environment variable is not set.');
        return Promise.resolve(false);
    }
}
