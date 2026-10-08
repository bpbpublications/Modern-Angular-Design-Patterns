// Scopes Playwright to e2e/ only. Without this, `npx playwright test` globs
// the whole project by default and collides with the Angular/Vitest unit
// specs under src/ (which use `describe`/`it` as Vitest globals, not
// Playwright's). Not using `defineConfig` from '@playwright/test' here since
// that package isn't installed (only the base `playwright` library is) —
// this is a plain config object, which Playwright's CLI accepts the same way.
export default {
  testDir: './e2e',
};
