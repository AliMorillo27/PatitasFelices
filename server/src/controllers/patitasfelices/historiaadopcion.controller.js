import { HistoriaAdopcionService } from '../../services/index.js';

export const createHistoriaAdopcion = async (req, res) => {
    try {
        const historiaAdopcion = await HistoriaAdopcionService.createHistoriaAdopcion(req.body);
        res.status(201).json(historiaAdopcion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllHistoriasAdopcion = async (req, res) => {
    try {
        const historiasAdopcion = await HistoriaAdopcionService.getAllHistoriasAdopcion();
        res.json(historiasAdopcion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getHistoriaAdopcionById = async (req, res) => {
    try {
        const historiaAdopcion = await HistoriaAdopcionService.getHistoriaAdopcionById(req.params.id);
        if (historiaAdopcion) {
            res.json(historiaAdopcion);
        } else {
            res.status(404).json({ message: 'HistoriaAdopcion no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateHistoriaAdopcion = async (req, res) => {
    try {
        const updatedHistoriaAdopcion = await HistoriaAdopcionService.updateHistoriaAdopcion(req.params.id, req.body);
        if (updatedHistoriaAdopcion) {
            res.json(updatedHistoriaAdopcion);
        } else {
            res.status(404).json({ message: 'HistoriaAdopcion no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteHistoriaAdopcion = async (req, res) => {
    try {
        const deleted = await HistoriaAdopcionService.deleteHistoriaAdopcion(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'HistoriaAdopcion no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
