import { Router } from 'express';
import {
    createCriterio,
    getAllCriterios,
    getCriterioById,
    updateCriterio,
    deleteCriterio
} from '../../controllers/index.js';

const router = Router();

router.post('/', createCriterio);
router.get('/', getAllCriterios);
router.get('/:id', getCriterioById);
router.put('/:id', updateCriterio);
router.delete('/:id', deleteCriterio);

export default router;
