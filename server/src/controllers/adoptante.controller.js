import { Adoptante } from '../models/patitasfelices/adoptante.model.js';

// Crear un nuevo adoptante
export const createAdoptante = async (req, res) => {
    try {
        const newAdoptante = await Adoptante.create(req.body);
        res.status(201).json(newAdoptante);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los adoptantes
export const getAdoptantes = async (req, res) => {
    try {
        const adoptantes = await Adoptante.findAll();
        res.status(200).json(adoptantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un adoptante por ID
export const getAdoptanteById = async (req, res) => {
    try {
        const adoptante = await Adoptante.findByPk(req.params.id);
        if (adoptante) {
            res.status(200).json(adoptante);
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un adoptante
export const updateAdoptante = async (req, res) => {
    try {
        const adoptante = await Adoptante.findByPk(req.params.id);
        if (adoptante) {
            await adoptante.update(req.body);
            res.status(200).json(adoptante);
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un adoptante
export const deleteAdoptante = async (req, res) => {
    try {
        const adoptante = await Adoptante.findByPk(req.params.id);
        if (adoptante) {
            await adoptante.destroy();
            res.status(204).json({ message: 'Adoptante eliminado' });
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};