import { test, expect, beforeAll, describe } from 'vitest';

import app from '@app';

describe('Authentication tests', () => {
    beforeAll(() => {
        if (app.httpServer)
            app.httpServer.close();
    });

    test('Server should be able to start', async () => {
        expect(app.httpServer).toBeUndefined();
        expect(() => app.start()).not.toThrow();
        expect(app.httpServer).toBeDefined();
    });
});
