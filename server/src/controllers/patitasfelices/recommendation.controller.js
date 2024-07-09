import recommendationService from '../../services/patitasfelices/recommendation.service.js';

export const getRecommendations = async (req, res) => {
    const { id_adoptante, numRecommendations } = req.body;
    
    try {
        const recommendations = await recommendationService.getForAdoptante(id_adoptante, numRecommendations);
        res.json(recommendations);
    } catch (error) {
        console.error('Error in getRecommendations:', error.message);
        res.status(500).json({ error: `Error fetching recommendations: ${error.message}` });
    }
};

export const getVisitorRecommendations = async (req, res) => {
    const { preferences, numRecommendations } = req.body; // Obtener las preferencias directamente del cuerpo de la solicitud
    
    try {
        const recommendations = await recommendationService.getForVisitor(preferences, numRecommendations);
        res.json(recommendations);
    } catch (error) {
        console.error('Error in getVisitorRecommendations:', error.message);
        res.status(500).json({ error: `Error fetching recommendations for visitor: ${error.message}` });
    }
};
