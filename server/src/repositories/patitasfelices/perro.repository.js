import { Perro } from '../../models/index.js';

const PerroRepository = {
    createPerro: async (perroData, transaction) => {
        return Perro.create(perroData, { transaction });
    },

    getAllPerros: async (query = {}) => {
        return Perro.findAll(query);
    },

    getPerroById: async (id) => {
        return Perro.findByPk(id);
    },

    updatePerro: async (id, perroData) => {
        const perro = await Perro.findByPk(id);
        if (perro) {
            return perro.update(perroData);
        }
        return null;
    },

    deletePerro: async (id) => {
        const perro = await Perro.findByPk(id);
        if (perro) {
            await perro.destroy();
            return true;
        }
        return false;
    }
};

export default PerroRepository;
