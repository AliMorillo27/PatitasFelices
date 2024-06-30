import { SolicitudAdopcionRepository, AdoptanteRepository, PerroRepository } from '../../repositories/index.js';

const SolicitudAdopcionService = {
    createSolicitudAdopcion: async (solicitudAdopcionData) => {
        const { id_adoptante, id_perro, estado } = solicitudAdopcionData;

        // Verificación de adoptante y perro válidos
        const adoptanteValido = await AdoptanteRepository.getAdoptanteById(id_adoptante);
        const perroValido = await PerroRepository.getPerroById(id_perro);
        if (!adoptanteValido || !perroValido) {
            throw new Error('El adoptante o el perro no son válidos.');
        }

        // Verificación de estado de la solicitud
        if (!['pendiente', 'aprobada', 'rechazada'].includes(estado)) {
            throw new Error('El estado de la solicitud no es válido.');
        }

        // Verificación de solicitudes pendientes duplicadas
        const solicitudesPendientes = await SolicitudAdopcionRepository.getAllSolicitudesAdopcion({
            where: {
                id_adoptante,
                id_perro,
                estado: 'pendiente'
            }
        });

        if (solicitudesPendientes.length > 0) {
            throw new Error('Ya existe una solicitud pendiente para este perro.');
        }

        return SolicitudAdopcionRepository.createSolicitudAdopcion(solicitudAdopcionData);
    },

    getAllSolicitudesAdopcion: async () => {
        return SolicitudAdopcionRepository.getAllSolicitudesAdopcion();
    },

    getSolicitudAdopcionById: async (id) => {
        return SolicitudAdopcionRepository.getSolicitudAdopcionById(id);
    },

    updateSolicitudAdopcion: async (id, solicitudAdopcionData) => {
        return SolicitudAdopcionRepository.updateSolicitudAdopcion(id, solicitudAdopcionData);
    },

    deleteSolicitudAdopcion: async (id) => {
        return SolicitudAdopcionRepository.deleteSolicitudAdopcion(id);
    }
};

export default SolicitudAdopcionService;
