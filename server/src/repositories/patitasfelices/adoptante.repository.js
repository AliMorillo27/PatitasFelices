import { Adoptante } from '../../models/index.js';

const AdoptanteRepository = {
    createAdoptante: async (adoptanteData, transaction) => {
        return Adoptante.create(adoptanteData, { transaction });
    },

    getAllAdoptantes: async (query={}) => {
        return Adoptante.findAll(query);
    },

    getAdoptanteById: async (id) => {
        return Adoptante.findByPk(id);
    },

    getAdoptanteByCedula: async (cedula) => {
        return Adoptante.findOne({
            where: {
                cedula: cedula
            }
        });
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