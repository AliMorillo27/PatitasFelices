import { CriterioService } from '../../services/index.js';

export const createCriterio = async (req, res) => {
    try {
        const criterio = await CriterioService.createCriterio(req.body);
        res.status(201).json(criterio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllCriterios = async (req, res) => {
    try {
        const criterios = await CriterioService.getAllCriterios();
        res.json(criterios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCriterioById = async (req, res) => {
    try {
        const criterio = await CriterioService.getCriterioById(req.params.id);
        if (criterio) {
            res.json(criterio);
        } else {
            res.status(404).json({ message: 'Criterio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCriterio = async (req, res) => {
    try {
        const updatedCriterio = await CriterioService.updateCriterio(req.params.id, req.body);
        if (updatedCriterio) {
            res.json(updatedCriterio);
        } else {
            res.status(404).json({ message: 'Criterio no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCriterio = async (req, res) => {
    try {
        const deleted = await CriterioService.deleteCriterio(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Criterio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
