import { Request, Response } from 'express';
import { Users } from '@prisma/client';

import UserService from '@services/UserService';
import UserResource from '@resources/UserResource';

export default class AuthController
{
    public static async register(request: Request, response: Response): Promise<Response> {
        const userService = new UserService();

        const { name, email, password } = request.body;
        const user = await userService.create(name, email, password);
        const token = userService.generateToken(user);

        return response.status(201).json({
            data: {
                user: UserResource.toArray(user),
                token,
            },
            error: null,
        });
    }

    public static async login(request: Request, response: Response): Promise<Response> {
        const user = request.body.user as Users;
        const password = request.body.password as string;
        const userService = new UserService();

        const passwordMatch = await userService.checkPassword(password, user.password);

        if (!passwordMatch) {
            return response.status(401).json({
                data: null,
                error: true,
                message: 'Invalid credentials.',
            });
        }

        const token = userService.generateToken(user);

        return response.status(200).json({
            data: {
                user: UserResource.toArray(user),
                token,
            },
            error: null,
        });
    }
}
