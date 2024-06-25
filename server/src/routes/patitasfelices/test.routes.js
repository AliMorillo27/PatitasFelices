import { Router } from 'express';
import {
    createTest,
    getAllTests,
    getTestById,
    updateTest,
    deleteTest
} from '../../controllers/index.js';

const router = Router();

router.post('/', createTest);
router.get('/', getAllTests);
router.get('/:id', getTestById);
router.put('/:id', updateTest);
router.delete('/:id', deleteTest);

export default router;
