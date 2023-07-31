import { Router } from "express";

// Imports from src folder
import * as userRouter from './users/routes';


export const router = Router();

router.use('/user', userRouter.routes);