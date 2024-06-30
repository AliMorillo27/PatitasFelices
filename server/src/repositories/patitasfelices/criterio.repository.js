import { Criterio } from '../../models/index.js';

const CriterioRepository = {
    createCriterio: async (criterioData, transaction) => {
        return Criterio.create(criterioData, { transaction });
    },

    getAllCriterios: async () => {
        return Criterio.findAll();
    },

    getCriterioById: async (id) => {
        return Criterio.findByPk(id);
    },

    updateCriterio: async (id, criterioData) => {
        const criterio = await Criterio.findByPk(id);
        if (criterio) {
            return criterio.update(criterioData);
        }
        return null;
    },

    deleteCriterio: async (id) => {
        const criterio = await Criterio.findByPk(id);
        if (criterio) {
            await criterio.destroy();
            return true;
        }
        return false;
    }
};

export default CriterioRepository;
