import yup from 'yup';
import { NextFunction, Request, Response } from 'express';

import UserService from '@services/UserService';

export default class ValidateLoginRequest
{
    public static async handle(request: Request, response: Response, next: NextFunction)
    {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (error) {
            return response.status(400).json({
                data: null,
                error: true,
                message: error.errors,
            });
        }

        const userService = new UserService();
        const user = await userService.findByEmail(request.body.email);

        if (!user) {
            return response.status(404).json({
                data: null,
                error: true,
                message: 'User not found.',
            });
        }

        request.body.user = user;

        return next();
    }
}
