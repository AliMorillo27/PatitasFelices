import { HistoriaAdopcionRepository } from '../../repositories/index.js';

const HistoriaAdopcionService = {
    createHistoriaAdopcion: async (historiaAdopcionData) => {
        return HistoriaAdopcionRepository.createHistoriaAdopcion(historiaAdopcionData);
    },

    getAllHistoriasAdopcion: async () => {
        return HistoriaAdopcionRepository.getAllHistoriasAdopcion();
    },

    getHistoriaAdopcionById: async (id) => {
        return HistoriaAdopcionRepository.getHistoriaAdopcionById(id);
    },

    updateHistoriaAdopcion: async (id, historiaAdopcionData) => {
        return HistoriaAdopcionRepository.updateHistoriaAdopcion(id, historiaAdopcionData);
    },

    deleteHistoriaAdopcion: async (id) => {
        return HistoriaAdopcionRepository.deleteHistoriaAdopcion(id);
    }
};

export default HistoriaAdopcionService;
