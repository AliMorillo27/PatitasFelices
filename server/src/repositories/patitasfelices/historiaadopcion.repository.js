import { HistoriaAdopcion } from '../../models/index.js';

const HistoriaAdopcionRepository = {
    createHistoriaAdopcion: async (historiaAdopcionData, transaction) => {
        return HistoriaAdopcion.create(historiaAdopcionData, { transaction });
    },

    getAllHistoriasAdopcion: async () => {
        return HistoriaAdopcion.findAll();
    },

    getHistoriaAdopcionById: async (id) => {
        return HistoriaAdopcion.findByPk(id);
    },

    updateHistoriaAdopcion: async (id, historiaAdopcionData) => {
        const historiaAdopcion = await HistoriaAdopcion.findByPk(id);
        if (historiaAdopcion) {
            return historiaAdopcion.update(historiaAdopcionData);
        }
        return null;
    },

    deleteHistoriaAdopcion: async (id) => {
        const historiaAdopcion = await HistoriaAdopcion.findByPk(id);
        if (historiaAdopcion) {
            await historiaAdopcion.destroy();
            return true;
        }
        return false;
    }
};

export default HistoriaAdopcionRepository;
