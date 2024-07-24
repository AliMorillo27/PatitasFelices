import { RecursoeduService } from '../../services/index.js';

export const createRecursoedu = async (req, res) => {
    try {
        const { nombre, descripcion, fecha_publicacion, tipo } = req.body;
        const imagen_url = req.files['imagen'] ? req.files['imagen'][0].path : null;
        const video_url = req.files['video'] ? req.files['video'][0].path : null;
        const pdf_url = req.files['pdf'] ? req.files['pdf'][0].path : null;

        const recursoeduData = { nombre, descripcion, fecha_publicacion, tipo, imagen_url, video_url, pdf_url };
        const recursoedu = await RecursoeduService.createRecursoedu(recursoeduData);
        res.status(201).json(recursoedu);
    } catch (error) {
        console.error('Error creating recurso educativo:', error);
        res.status(400).json({ message: error.message, error });
    }
};

export const getAllRecursosedu = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; // Default to 10 if not specified
        const offset = (page - 1) * limit;

        const filters = {};

        if (req.query.tipo) filters.tipo = req.query.tipo;

        const result = await RecursoeduService.getAllRecursosedu({ limit, offset, filters });
        const totalRecursos = await RecursoeduService.countAllRecursosedu(filters);

        res.json({
            recursos: result,
            totalPages: Math.ceil(totalRecursos / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecursoeduById = async (req, res) => {
    try {
        const recursoedu = await RecursoeduService.getRecursoeduById(req.params.id);
        if (recursoedu) {
            res.json(recursoedu);
        } else {
            res.status(404).json({ message: 'Recurso educativo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRecursoedu = async (req, res) => {
    try {
        const { nombre, descripcion, fecha_publicacion, tipo } = req.body;
        const imagen_url = req.files['imagen'] ? req.files['imagen'][0].path : null;
        const video_url = req.files['video'] ? req.files['video'][0].path : null;
        const pdf_url = req.files['pdf'] ? req.files['pdf'][0].path : null;

        const recursoeduData = { nombre, descripcion, fecha_publicacion, tipo, imagen_url, video_url, pdf_url };
        const updatedRecursoedu = await RecursoeduService.updateRecursoedu(req.params.id, recursoeduData);
        if (updatedRecursoedu) {
            res.json(updatedRecursoedu);
        } else {
            res.status(404).json({ message: 'Recurso educativo no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteRecursoedu = async (req, res) => {
    try {
        const deleted = await RecursoeduService.deleteRecursoedu(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Recurso educativo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
