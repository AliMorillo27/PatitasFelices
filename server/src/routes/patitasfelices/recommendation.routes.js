// src/routes/patitasfelices/recommendation.routes.js
import express from 'express';
import { getRecommendations, getVisitorRecommendations } from '../../controllers/patitasfelices/recommendation.controller.js';

const router = express.Router();

router.post('/recomendar', getRecommendations);
router.post('/recomendar-visitante', getVisitorRecommendations);

export default router;
