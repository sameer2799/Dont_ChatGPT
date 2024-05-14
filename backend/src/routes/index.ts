import { Router } from 'express';
import app from '../app.js';
import userRouter from './user_routes.js';
import chatRouter from './chat_routes.js';

const appRouter = Router();

appRouter.use("/user", userRouter);
appRouter.use("/chat", chatRouter);

export default appRouter;