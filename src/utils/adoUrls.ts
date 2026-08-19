/**
 * Shared ADO URL constants and validation.
 */

export const ADO_BASE_URL = 'https://dev.azure.com';

const ADO_URL_PATTERN = /^https:\/\/([^/]+\.)?(dev\.azure\.com|visualstudio\.com)\//;

/** Returns true if the URL points to a known Azure DevOps domain. */
export function isAdoUrl(url: string): boolean {
    return ADO_URL_PATTERN.test(url);
}
