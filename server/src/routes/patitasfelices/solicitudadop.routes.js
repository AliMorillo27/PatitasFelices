import { Router } from 'express';
import {
    createSolicitudAdopcion,
    getAllSolicitudesAdopcion,
    getSolicitudAdopcionById,
    updateSolicitudAdopcion,
    deleteSolicitudAdopcion
} from '../../controllers/index.js';

const router = Router();

router.post('/', createSolicitudAdopcion);
router.get('/', getAllSolicitudesAdopcion);
router.get('/:id', getSolicitudAdopcionById);
router.put('/:id', updateSolicitudAdopcion);
router.delete('/:id', deleteSolicitudAdopcion);

export default router;
