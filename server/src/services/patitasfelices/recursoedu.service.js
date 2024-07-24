import { RecursoeduRepository } from '../../repositories/index.js';

const RecursoeduService = {
    createRecursoedu: async (recursoeduData) => {
        const tiposValidos = ['guía', 'artículo', 'video'];
        if (!tiposValidos.includes(recursoeduData.tipo)) {
            throw new Error('Los recursos educativos deben estar categorizados como guía, artículo o video.');
        }

        return RecursoeduRepository.createRecursoedu(recursoeduData);
    },

    getAllRecursosedu: async (pagination) => {
        return RecursoeduRepository.getAllRecursosedu(pagination);
    },

    countAllRecursosedu: async (filters) => {
        return RecursoeduRepository.countAllRecursosedu(filters);
    },

    getRecursoeduById: async (id) => {
        return RecursoeduRepository.getRecursoeduById(id);
    },

    updateRecursoedu: async (id, recursoeduData) => {
        const tiposValidos = ['guía', 'artículo', 'video'];
        if (recursoeduData.tipo && !tiposValidos.includes(recursoeduData.tipo)) {
            throw new Error('Los recursos educativos deben estar categorizados como guía, artículo o video.');
        }

        return RecursoeduRepository.updateRecursoedu(id, recursoeduData);
    },

    deleteRecursoedu: async (id) => {
        return RecursoeduRepository.deleteRecursoedu(id);
    }
};

export default RecursoeduService;
