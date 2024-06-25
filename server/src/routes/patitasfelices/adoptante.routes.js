import { Router } from 'express';
import {
    createAdoptante,
    getAllAdoptantes,
    getAdoptanteById,
    updateAdoptante,
    deleteAdoptante,
    loginAdoptante
} from '../../controllers/patitasfelices/adoptante.controller.js';

const router = Router();

router.post('/', createAdoptante);
router.get('/', getAllAdoptantes);
router.get('/:id', getAdoptanteById);
router.put('/:id', updateAdoptante);
router.delete('/:id', deleteAdoptante);
router.post('/login', loginAdoptante);

export default router;
