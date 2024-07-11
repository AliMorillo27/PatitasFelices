import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

// Configura CORS para permitir solicitudes desde http://localhost:3001
const corsOptions = {
  origin: 'http://localhost:3001',
};

app.use(cors(corsOptions));
app.use(express.json());

// Usa las rutas
app.use('/api', routes);

export default app;
