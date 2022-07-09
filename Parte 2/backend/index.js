import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv'

import catsRoutes from './routes/cats.js';
import databeseRoutes from './routes/database.js'

dotenv.config();    

const app = express();
const PORT = process.env.REACT_APP_PORT || 5000;
 
app.use(cors());

app.use(bodyParser.json());

app.use('/api/v1', catsRoutes);

app.use('/database', databeseRoutes); 

app.listen(PORT, () => console.log("Server online on port: "+ PORT));
