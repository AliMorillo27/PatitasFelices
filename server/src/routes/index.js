// src/routes/index.js

import { Router } from 'express';
import adoptanteRoutes from './patitasfelices/adoptante.routes.js';
import estadoRoutes from './patitasfelices/estado.routes.js';
import perroRoutes from './patitasfelices/perro.routes.js';
import recursoeduRoutes from './patitasfelices/recursoedu.routes.js';
import solicitudAdopcionRoutes from './patitasfelices/solicitudadop.routes.js';
import usuarioRoutes from './patitasfelices/usuario.routes.js';
import recomendarRoutes from './patitasfelices/recommendation.routes.js'

const router = Router();

router.use('/adoptantes', adoptanteRoutes);
router.use('/estados', estadoRoutes);
router.use('/perros', perroRoutes);
router.use('/recursos-educativos', recursoeduRoutes);
router.use('/solicitudes-adopcion', solicitudAdopcionRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/', recomendarRoutes);

export default router;
