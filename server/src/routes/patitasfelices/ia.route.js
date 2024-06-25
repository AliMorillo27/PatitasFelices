// ia.route.js
import express from 'express';
import { obtenerRecomendaciones } from  '../../controllers/index.js';

const router = express.Router();

router.post('/recomendar', obtenerRecomendaciones);

export default router;
