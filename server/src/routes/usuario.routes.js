import { Router } from 'express';
import { createUsuario, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario } from '../controllers/usuario.controller.js';

const router = Router();

router.post('/usuarios', createUsuario);
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuarioById);
router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);

export default router;
