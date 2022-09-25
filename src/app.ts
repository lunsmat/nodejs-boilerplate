import express from 'express';
import { Server } from 'http';

import routes from '@routes';

class Application
{
    private readonly app: express.Application;
    private server?: Server;

    public constructor() {
        this.app = express();

        this.setup();
    }

    private vars(): void {
        this.app.set('port', 3333);
    }

    private middlewares(): void {
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use(routes);
    }

    private setup(): void {
        this.vars();
        this.middlewares();
        this.routes();
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
