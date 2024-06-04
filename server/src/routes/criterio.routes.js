import { Router } from 'express';
import { createCriterio, getCriterios, getCriterioById, updateCriterio, deleteCriterio } from '../controllers/criterio.controller.js';

const router = Router();

router.post('/criterios', createCriterio);
router.get('/criterios', getCriterios);
router.get('/criterios/:id', getCriterioById);
router.put('/criterios/:id', updateCriterio);
router.delete('/criterios/:id', deleteCriterio);

export default router;
