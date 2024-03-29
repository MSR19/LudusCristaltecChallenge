import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import catsRoutes from './routes/cats.js';

dotenv.config();   

const app = express();
const PORT = process.env.REACT_APP_PORT || 5000;

app.use(bodyParser.json());

app.use('/api/v1', catsRoutes);


app.listen(PORT, () => console.log("Server online on port: "+ PORT));
