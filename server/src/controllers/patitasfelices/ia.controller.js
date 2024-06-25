// ia.controller.js
import IAService from '../../services/patitasfelices/ia.service.js';

export const obtenerRecomendaciones = async (req, res) => {
  const { idAdoptante } = req.body;

  try {
    const recomendaciones = await IAService.obtenerRecomendaciones(idAdoptante);
    res.json(recomendaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
