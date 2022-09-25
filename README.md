# Nodejs Boilerplate
This is a nodejs boilerplate for building a REST API with express. It uses Typescript, Postgres with Prima ORM, Vitest for testing. Building with babel to production and ts-node-dev for development.

## Getting Started
### Prerequisites
- Nodejs
- Postgres

### Installing
- Clone the repo
- Install dependencies with `yarn install`
- Create a `.env` file and copy the content of `.env.example` to it

### Vscode Extensions
- ESLint
- EditorConfig for VS Code

### Running the app
- Run `yarn dev` to start the app in development mode.

#### Running to production
- Run `yarn build` to build the app.
- Run `yarn start` to start the app in production mode.

### Running the tests
- Run `yarn test` to run the tests.
- Run `yarn test:coverage` to run the tests with coverage.

## Dependencies
### Express
[Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### Cors
[Cors](https://www.npmjs.com/package/cors) is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

### Dotenv
[Dotenv](https://www.npmjs.com/package/dotenv) is a zero-dependency module that loads environment variables from a .env file into process.env.

## Development Dependencies
### Typescript
[Typescript](https://www.typescriptlang.org/) is a typed superset of JavaScript that compiles to plain JavaScript.

### Ts-node-dev
[Ts-node-dev](https://www.npmjs.com/package/ts-node-dev) is a utility that will monitor for any changes in your source and automatically restart your server.

### @types/node
[@types/node](https://www.npmjs.com/package/@types/node) is a TypeScript definition file for Node.js.

### @types/express
[@types/express](https://www.npmjs.com/package/@types/express) is a TypeScript definition file for Express.

### EsLint
[EsLint](https://eslint.org/) is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. You'll need to install the [EsLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for VSCode.

### tsconfig-paths
[tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths) is a module that allows you to use path aliases in your tsconfig.json file.

### Vitest
[Vitest](https://vitest.dev/) blazing fast unit test framework that uses vite.

### supertest
[supertest](https://www.npmjs.com/package/supertest) is a module that allows you to test HTTP requests.

### @types/supertest
[@types/supertest](https://www.npmjs.com/package/@types/supertest) is a TypeScript definition file for supertest.

## Branches
- master: The main branch. Contains the latest stable version, includes the prisma database config.
- base: The branch with only the base project with dependencies and configurations. With only the base app with tests.
