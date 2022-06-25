import express from 'express';
import bodyParser from 'body-parser';

import catsRoutes from './routes/cats.js';

const app = express();
const PORT = 5000;


app.use(bodyParser.json());

app.use('/api/v1', catsRoutes);

app.listen(PORT, () => console.log("Ola"));
