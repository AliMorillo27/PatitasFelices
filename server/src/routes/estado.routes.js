import { Router } from 'express';
import { createEstado, getEstados, getEstadoById, updateEstado, deleteEstado } from '../controllers/estado.controller.js';

const router = Router();

router.post('/estados', createEstado);
router.get('/estados', getEstados);
router.get('/estados/:id', getEstadoById);
router.put('/estados/:id', updateEstado);
router.delete('/estados/:id', deleteEstado);

export default router;
