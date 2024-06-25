import { PerroService } from '../../services/index.js';

export const createPerro = async (req, res) => {
    try {
        const perro = await PerroService.createPerro(req.body);
        res.status(201).json(perro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllPerros = async (req, res) => {
    try {
        const perros = await PerroService.getAllPerros();
        res.json(perros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPerroById = async (req, res) => {
    try {
        const perro = await PerroService.getPerroById(req.params.id);
        if (perro) {
            res.json(perro);
        } else {
            res.status(404).json({ message: 'Perro not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePerro = async (req, res) => {
    try {
        const updatedPerro = await PerroService.updatePerro(req.params.id, req.body);
        if (updatedPerro) {
            res.json(updatedPerro);
        } else {
            res.status(404).json({ message: 'Perro not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePerro = async (req, res) => {
    try {
        const deleted = await PerroService.deletePerro(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Perro not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getPerrosPorTamano = async (req, res) => {
    try {
        const tamano = req.params.tamano;
        const perros = await PerroService.getPerrosPorTamano(tamano);
        res.json(perros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPerrosPorEstado = async (req, res) => {
    try {
        const estado = req.params.estado;
        const perros = await PerroService.getPerrosPorEstado(estado);
        res.json(perros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};