import { Router } from 'express';
import { createSolicitudAdopcion, getSolicitudesAdopcion, getSolicitudAdopcionById, updateSolicitudAdopcion, deleteSolicitudAdopcion } from '../controllers/solicitudadop.controller.js';

const router = Router();

router.post('/solicitudesadopcion', createSolicitudAdopcion);
router.get('/solicitudesadopcion', getSolicitudesAdopcion);
router.get('/solicitudesadopcion/:id', getSolicitudAdopcionById);
router.put('/solicitudesadopcion/:id', updateSolicitudAdopcion);
router.delete('/solicitudesadopcion/:id', deleteSolicitudAdopcion);

export default router;
