import { CriterioRepository } from '../../repositories/index.js';

const CriterioService = {
    createCriterio: async (criterioData) => {
        return CriterioRepository.createCriterio(criterioData);
    },

    getAllCriterios: async () => {
        return CriterioRepository.getAllCriterios();
    },

    getCriterioById: async (id) => {
        return CriterioRepository.getCriterioById(id);
    },

    updateCriterio: async (id, criterioData) => {
        return CriterioRepository.updateCriterio(id, criterioData);
    },

    deleteCriterio: async (id) => {
        return CriterioRepository.deleteCriterio(id);
    }
};

export default CriterioService;
