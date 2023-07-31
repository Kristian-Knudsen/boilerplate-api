import express, { Express} from 'express';
import cors from 'cors';
import { router } from './src/router';
require('dotenv').config();

const app: Express = express();
const PORT = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.listen(PORT, () => console.log(`[API] Listening at http://localhost:${PORT}`));