import express from 'express';
import { config } from 'dotenv';
import morgan from "morgan";
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


config();
const app = express();

// remove in production
app.use(morgan('dev'));


// middlewares
app.use(cors({ origin: "https://fuzzy-telegram-gwp7jj64j5xhrqq-5173.app.github.dev/", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1", appRouter);


export default app;