import { Router } from "express";
import * as userController from './controller';

export const routes = Router();

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);