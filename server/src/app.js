import express from 'express'
import indexModel from './models/index.model.js'
import adoptanteRoutes from './routes/adoptante.routes.js'; 
import criterioRoutes from './routes/criterio.routes.js'; 
import estadoRoutes from './routes/estado.routes.js'; 
import perroRoutes from './routes/perro.routes.js'; 
import recursoeduRoutes from './routes/recursoedu.routes.js'; 
import solicitudadopRoutes from './routes/solicitudadop.routes.js'; 
import testRoutes from './routes/test.routes.js'; 
import usuarioRoutes from './routes/usuario.routes.js'; 
const app = express()
app.use(express.json());

// Usa las rutas
app.use('/api', adoptanteRoutes);
app.use('/api', criterioRoutes);
app.use('/api', estadoRoutes);
app.use('/api', perroRoutes);
app.use('/api', recursoeduRoutes);
app.use('/api', solicitudadopRoutes);
app.use('/api', testRoutes);
app.use('/api', usuarioRoutes);
export default app