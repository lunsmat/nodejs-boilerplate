import { Router } from 'express';

import PingController from '@controllers/PingController';
import AuthController from '@controllers/AuthController';

import ValidateCreateUserRequest from '@middlewares/ValidateCreateUserRequest';
import ValidateLoginRequest from '@middlewares/ValidateLoginRequest';

const routes = Router();

routes.get('/ping', PingController.handle);

routes.post('/auth/register', ValidateCreateUserRequest.handle, AuthController.register);
routes.post('/auth/login', ValidateLoginRequest.handle, AuthController.login);

export default routes;
