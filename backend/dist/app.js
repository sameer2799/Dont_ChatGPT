import express from 'express';
import { config } from 'dotenv';
import morgan from "morgan";
import appRouter from './routes/index.js';
config();
const app = express();
// remove in production
app.use(morgan('dev'));
// middlewares
app.use(express.json());
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map