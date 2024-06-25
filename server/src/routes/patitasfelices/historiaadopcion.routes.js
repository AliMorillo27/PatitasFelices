import { Router } from 'express';
import {
    createHistoriaAdopcion,
    getAllHistoriasAdopcion,
    getHistoriaAdopcionById,
    updateHistoriaAdopcion,
    deleteHistoriaAdopcion
} from '../../controllers/index.js';

const router = Router();

router.post('/', createHistoriaAdopcion);
router.get('/', getAllHistoriasAdopcion);
router.get('/:id', getHistoriaAdopcionById);
router.put('/:id', updateHistoriaAdopcion);
router.delete('/:id', deleteHistoriaAdopcion);

export default router;
