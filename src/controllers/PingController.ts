import { Request, Response } from 'express';

export default class PingController
{
    public static handle(request: Request, response: Response): Response {
        return response.json({
            message: 'pong',
        });
    }
}
