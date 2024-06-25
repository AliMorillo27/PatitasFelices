import { Criterio } from '../../models/index.js';

const CriterioRepository = {
    async getAllCriterios() {
        return await Criterio.findAll();
    },

    async getCriterioById(id) {
        return await Criterio.findByPk(id);
    },

    async createCriterio(criterio) {
        return await Criterio.create(criterio);
    },

    async updateCriterio(id, criterio) {
        const existingCriterio = await Criterio.findByPk(id);
        if (existingCriterio) {
            return await existingCriterio.update(criterio);
        }
        return null;
    },

    async deleteCriterio(id) {
        const criterio = await Criterio.findByPk(id);
        if (criterio) {
            await criterio.destroy();
            return true;
        }
        return false;
    }
}

export default CriterioRepository;