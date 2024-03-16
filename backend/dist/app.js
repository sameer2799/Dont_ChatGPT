import express from 'express';
import { config } from 'dotenv';
import morgan from "morgan";
config();
const app = express();
// remove in production
app.use(morgan('dev'));
// middlewares
app.use(express.json());
// app.use('/api/v1');
// app.get('/', (req, res) => {
//     res.send('Hello World');
//     });
export default app;
//# sourceMappingURL=app.js.map