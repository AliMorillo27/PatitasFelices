import { Adoptante } from '../../models/index.js';

const AdoptanteRepository = {
    createAdoptante: async (adoptanteData, transaction) => {
        return Adoptante.create(adoptanteData, { transaction });
    },

    getAllAdoptantes: async () => {
        return Adoptante.findAll();
    },

    getAdoptanteById: async (id) => {
        return Adoptante.findByPk(id);
    },

    updateAdoptante: async (id, adoptanteData) => {
        const adoptante = await Adoptante.findByPk(id);
        if (adoptante) {
            return adoptante.update(adoptanteData);
        }
        return null;
    },

    deleteAdoptante: async (id) => {
        const adoptante = await Adoptante.findByPk(id);
        if (adoptante) {
            await adoptante.destroy();
            return true;
        }
        return false;
    }
};

export default AdoptanteRepository;
