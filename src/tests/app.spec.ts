import { test, expect } from 'vitest';

import app from '@app';

test('Server should be able to start', async () => {
    expect(app.httpServer).toBeUndefined();
    expect(() => app.start()).not.toThrow();
    expect(app.httpServer).toBeDefined();
});
