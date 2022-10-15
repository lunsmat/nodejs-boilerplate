import { test, expect, describe, beforeEach, afterAll } from 'vitest';
import request from 'supertest';

import app from '@app';
import prisma from '@prisma-client';
import UserService from '@services/UserService';

describe('Authentication tests', () => {
    const userService = new UserService();

    beforeEach(async () => {
        const user = await userService.findByEmail('john.doe@example.com');

        if (user) {
            await prisma.users.delete({
                where: {
                    id: user.id,
                },
            });
        }
    });

    afterAll(() => {
        prisma.$disconnect();
    });

    test('should register a new user', async () => {
        const response = await request(app.instance)
            .post('/auth/register')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '123456',
            });

        expect(response.status).toBe(201);
        expect(response.body.data.user).toHaveProperty('id');
        expect(response.body.data.user).toHaveProperty('name');
        expect(response.body.data.user).toHaveProperty('email');
        expect(response.body.data.user).toHaveProperty('created_at');
        expect(response.body.data.user).toHaveProperty('updated_at');
    });

    test('should not register a new user with an existing email', async () => {
        await userService.create('John Doe', 'john.doe@example.com', '123456');

        const response = await request(app.instance)
            .post('/auth/register')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '123456',
            });

        expect(response.status).toBe(400);
        expect(response.body.data).toBe(null);
        expect(response.body.error).toBe(true);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('User already exists.');
    });

    test('should not register a new user with invalid data', async () => {
        const response = await request(app.instance)
            .post('/auth/register')
            .send({
                name: '',
                email: 'not a valid email',
                password: '',
            });

        expect(response.status).toBe(400);
        expect(response.body.data).toBe(null);
        expect(response.body.error).toBe(true);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual([
            'name is a required field',
            'email must be a valid email',
            'password is a required field',
        ]);
    });

    test('should login an existing user', async () => {
        await userService.create('John Doe', 'john.doe@example.com', '123456');

        const response = await request(app.instance)
            .post('/auth/login')
            .send({
                email: 'john.doe@example.com',
                password: '123456',
            });

        expect(response.status).toBe(200);
        expect(response.body.data.user).toHaveProperty('id');
        expect(response.body.data.user).toHaveProperty('name');
        expect(response.body.data.user).toHaveProperty('email');
        expect(response.body.data.user).toHaveProperty('created_at');
        expect(response.body.data.user).toHaveProperty('updated_at');
        expect(response.body.data).toHaveProperty('token');
    });

    test('should not login a non-existing user', async () => {
        const response = await request(app.instance)
            .post('/auth/login')
            .send({
                email: 'john.doe@example.com',
                password: '123456',
            });

        expect(response.status).toBe(404);
        expect(response.body.data).toBe(null);
        expect(response.body.error).toBe(true);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('User not found.');
    });

    test('should not login a user with invalid data', async () => {
        const response = await request(app.instance)
            .post('/auth/login')
            .send({
                email: 'not a valid email',
                password: '',
            });

        expect(response.status).toBe(400);
        expect(response.body.data).toBe(null);
        expect(response.body.error).toBe(true);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual([
            'email must be a valid email',
            'password is a required field',
        ]);
    });

    test('should not login a user with invalid credentials', async () => {
        await userService.create('John Doe', 'john.doe@example.com', '123456');

        const response = await request(app.instance)
            .post('/auth/login')
            .send({
                email: 'john.doe@example.com',
                password: 'wrong password',
            });

        console.log(response.body);

        expect(response.status).toBe(401);
        expect(response.body.data).toBe(null);
        expect(response.body.error).toBe(true);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Invalid credentials.');
    });
});
