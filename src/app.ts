import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import { Server } from 'http';
import cors from 'cors';

import routes from '@routes';
import prisma from '@prisma-client';

class Application
{
    private readonly app: express.Application;
    private server?: Server;
    private prisma: PrismaClient;

    public constructor() {
        this.app = express();
        this.prisma = prisma;

        this.setup();
    }

    private vars(): void {
        this.app.set('port', process.env.PORT);
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(cors());
    }

    private routes(): void {
        this.app.use(routes);
    }

    private async database(): Promise<void> {
        await this.prisma.$connect();
    }

    private setup(): void {
        this.vars();
        this.middlewares();
        this.routes();
        this.database();
    }

    public start(): void {
        const server = this.app.listen(this.app.get('port'), () => {
            console.log(`🚀 Server running on port ${Object(server.address()).port}`);
        });

        this.server = server;
    }

    get instance(): express.Application {
        return this.app;
    }

    get httpServer(): Server | undefined {
        return this.server;
    }
}

const app = new Application();

export default app;
