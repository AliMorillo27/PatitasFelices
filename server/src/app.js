// src/app.js
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';  // Asegúrate de que la ruta sea correcta

<<<<<<< HEAD
const app = express()
/*app.use(indexRoutes)*/
=======
const app = express();
>>>>>>> felix

// Configura CORS para permitir solicitudes desde http://localhost:3001
const corsOptions = {
  origin: 'http://localhost:3001',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('../uploads')); // Asegúrate de servir la carpeta de cargas estáticas

// Usa las rutas
app.use('/api', routes);

export default app;
