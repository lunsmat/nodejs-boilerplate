import { test, expect } from 'vitest';
import request from 'supertest';

import app from '@app';

test('Route [GET] /ping should return 200', async () => {
    const response = await request(app.instance).get('/ping');
    expect(response.status).toBe(200);
});

test('Route [GET] /ping should return the message "pong"', async () => {
    const response = await request(app.instance).get('/ping');
    expect(response.body.message).toBe('pong');
});
