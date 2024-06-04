import { Router } from 'express';
import { createPerro, getPerros, getPerroById, updatePerro, deletePerro } from '../controllers/perro.controller.js';

const router = Router();

router.post('/perros', createPerro);
router.get('/perros', getPerros);
router.get('/perros/:id', getPerroById);
router.put('/perros/:id', updatePerro);
router.delete('/perros/:id', deletePerro);

export default router;
