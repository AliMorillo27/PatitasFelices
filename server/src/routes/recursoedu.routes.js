import { Router } from 'express';
import { createRecursoedu, getRecursosedu, getRecursoeduById, updateRecursoedu, deleteRecursoedu } from '../controllers/recursoedu.controller.js';

const router = Router();

router.post('/recursosedu', createRecursoedu);
router.get('/recursosedu', getRecursosedu);
router.get('/recursosedu/:id', getRecursoeduById);
router.put('/recursosedu/:id', updateRecursoedu);
router.delete('/recursosedu/:id', deleteRecursoedu);

export default router;
