import express from 'express';
import { config } from 'dotenv';
import morgan from "morgan";

config();
const app = express();

// remove in production
app.use(morgan('dev'));


// middlewares
app.use(express.json());

app.use('/api/v1');

export default app;