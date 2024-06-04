import { Router } from 'express';
import { createAdoptante, getAdoptantes, getAdoptanteById, updateAdoptante, deleteAdoptante } from '../controllers/adoptante.controller.js';

const router = Router();

router.post('/adoptantes', createAdoptante);
router.get('/adoptantes', getAdoptantes);
router.get('/adoptantes/:id', getAdoptanteById);
router.put('/adoptantes/:id', updateAdoptante);
router.delete('/adoptantes/:id', deleteAdoptante);

export default router;
