import { SolicitudAdopcion } from '../../models/index.js';

const SolicitudAdopcionRepository = {
    createSolicitudAdopcion: async (solicitudAdopcionData, transaction) => {
        return SolicitudAdopcion.create(solicitudAdopcionData, { transaction });
    },

    getAllSolicitudesAdopcion: async () => {
        return SolicitudAdopcion.findAll();
    },

    getSolicitudAdopcionById: async (id) => {
        return SolicitudAdopcion.findByPk(id);
    },

    updateSolicitudAdopcion: async (id, solicitudAdopcionData) => {
        const solicitudAdopcion = await SolicitudAdopcion.findByPk(id);
        if (solicitudAdopcion) {
            return solicitudAdopcion.update(solicitudAdopcionData);
        }
        return null;
    },

    deleteSolicitudAdopcion: async (id) => {
        const solicitudAdopcion = await SolicitudAdopcion.findByPk(id);
        if (solicitudAdopcion) {
            await solicitudAdopcion.destroy();
            return true;
        }
        return false;
    }
};

export default SolicitudAdopcionRepository;
