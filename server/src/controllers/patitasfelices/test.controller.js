import { TestService } from '../../services/index.js';

export const createTest = async (req, res) => {
    try {
        const test = await TestService.createTest(req.body);
        res.status(201).json(test);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllTests = async (req, res) => {
    try {
        const tests = await TestService.getAllTests();
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTestById = async (req, res) => {
    try {
        const test = await TestService.getTestById(req.params.id);
        if (test) {
            res.json(test);
        } else {
            res.status(404).json({ message: 'Test no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTest = async (req, res) => {
    try {
        const updatedTest = await TestService.updateTest(req.params.id, req.body);
        if (updatedTest) {
            res.json(updatedTest);
        } else {
            res.status(404).json({ message: 'Test no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTest = async (req, res) => {
    try {
        const deleted = await TestService.deleteTest(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Test no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
