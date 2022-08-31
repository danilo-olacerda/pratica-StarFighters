import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server rodando na porta: ${process.env.PORT || 3000}`);
});