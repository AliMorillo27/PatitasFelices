import { AdoptanteService } from '../../services/index.js';

export const createAdoptante = async (req, res) => {
    try {
        const adoptante = await AdoptanteService.createAdoptante(req.body);
        res.status(201).json(adoptante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllAdoptantes = async (req, res) => {
    try {
        const adoptantes = await AdoptanteService.getAllAdoptantes();
        res.json(adoptantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdoptanteById = async (req, res) => {
    try {
        const adoptante = await AdoptanteService.getAdoptanteById(req.params.id);
        if (adoptante) {
            res.json(adoptante);
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAdoptante = async (req, res) => {
    try {
        const updatedAdoptante = await AdoptanteService.updateAdoptante(req.params.id, req.body);
        if (updatedAdoptante) {
            res.json(updatedAdoptante);
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAdoptante = async (req, res) => {
    try {
        const deleted = await AdoptanteService.deleteAdoptante(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginAdoptante = async (req, res) => {
    try {
        const adoptante = await AdoptanteService.loginAdoptante(req.body.email, req.body.contraseña);
        res.json(adoptante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const getAdoptanteByCedula = async (req, res) => {
    try {
        const adoptante = await AdoptanteService.getAdoptanteByCedula(req.params.cedula);
        if (adoptante) {
            res.json(adoptante);
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdoptantesOrdenadosPorNombre = async (req, res) => {
    try {
        const adoptantes = await AdoptanteService.getAdoptantesOrdenadosPorNombre();
        res.json(adoptantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
