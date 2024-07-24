import { Router } from 'express';
import upload from '../../middleware/upload.js';
import {
  createRecursoedu,
  getAllRecursosedu,
  getRecursoeduById,
  updateRecursoedu,
  deleteRecursoedu
} from '../../controllers/index.js';

const router = Router();

router.post('/', upload.fields([{ name: 'imagen', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), createRecursoedu);
router.get('/', getAllRecursosedu);
router.get('/:id', getRecursoeduById);
router.put('/:id', upload.fields([{ name: 'imagen', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), updateRecursoedu);
router.delete('/:id', deleteRecursoedu);

export default router;
