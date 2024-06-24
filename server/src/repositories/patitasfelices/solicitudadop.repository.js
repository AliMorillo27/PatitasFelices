import { SolicitudAdopcion } from '../../models/index.js';

const SolicitudAdopcionRepository = {
    async getAllSolicitudes() {
        return await SolicitudAdopcion.findAll();
    },

    async getSolicitudById(id) {
        return await SolicitudAdopcion.findByPk(id);
    },

    async createSolicitud(solicitud) {
        return await SolicitudAdopcion.create(solicitud);
    },

    async updateSolicitud(id, solicitud) {
        const existingSolicitud = await SolicitudAdopcion.findByPk(id);
        if (existingSolicitud) {
            return await existingSolicitud.update(solicitud);
        }
        return null;
    },

    async deleteSolicitud(id) {
        const solicitud = await SolicitudAdopcion.findByPk(id);
        if (solicitud) {
            await solicitud.destroy();
            return true;
        }
        return false;
    }
}

export default SolicitudAdopcionRepository;
