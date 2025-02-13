import express from 'express';
import { config } from 'dotenv';
import morgan from "morgan";
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


config();
const app = express();

// remove in production
// app.use(morgan('dev'));


// middlewares
app.use(cors({ origin: "https://dont-chat-gpt-pqlv.vercel.app:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1", appRouter);


export default app;