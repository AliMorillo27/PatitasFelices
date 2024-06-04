import { Router } from 'express';
import { createTest, getTests, getTestById, updateTest, deleteTest } from '../controllers/test.controller.js';

const router = Router();

router.post('/tests', createTest);
router.get('/tests', getTests);
router.get('/tests/:id', getTestById);
router.put('/tests/:id', updateTest);
router.delete('/tests/:id', deleteTest);

export default router;
