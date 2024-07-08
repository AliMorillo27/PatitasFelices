import { SolicitudAdopcionRepository, AdoptanteRepository, PerroRepository } from '../../repositories/index.js';
import { Op } from 'sequelize';

const SolicitudAdopcionService = {
    createSolicitudAdopcion: async (solicitudAdopcionData) => {
        const { id_adoptante, id_perro, estado } = solicitudAdopcionData;

        // Establecer estado por defecto a 'pendiente'
        solicitudAdopcionData.estado = 'pendiente';

        // Verificación de adoptante y perro válidos
        const adoptanteValido = await AdoptanteRepository.getAdoptanteById(id_adoptante);
        const perroValido = await PerroRepository.getPerroById(id_perro);
        if (!adoptanteValido || !perroValido) {
            throw new Error('El adoptante o el perro no son válidos.');
        }

        // Verificación de adoptante que ha devuelto un perro
        const devoluciones = await SolicitudAdopcionRepository.getAllSolicitudesAdopcion({
            where: {
                id_adoptante,
                rechazado_por_devolucion: true
            }
        });

        if (devoluciones.length > 0) {
            throw new Error('El adoptante ha devuelto un perro anteriormente y no puede adoptar más.');
        }

        const solicitudesPendientes = await SolicitudAdopcionRepository.getAllSolicitudesAdopcion({
            where: {
                estado: 'pendiente',
                [Op.or]: [
                    { id_adoptante },
                    { id_perro }
                ]
            }
        });
        
        if (solicitudesPendientes.length > 0) {
            throw new Error('Ya existe una solicitud pendiente para este perro y adoptante.');
        }        

          // Verificación de adoptante con más de dos perros adoptados
          const solicitudesAprobadas = await SolicitudAdopcionRepository.getAllSolicitudesAdopcion({
            where: {
                id_adoptante,
                estado: 'aprobada'
            }
        });

        if (solicitudesAprobadas.length >= 2) {
            throw new Error('El adoptante ya tiene dos perros adoptados.');
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
        const solicitudAdopcion = await SolicitudAdopcionRepository.getSolicitudAdopcionById(id);
        
        // Verificación del nuevo estado, si se proporciona
        if (solicitudAdopcionData.estado && !['aprobada', 'rechazada'].includes(solicitudAdopcionData.estado)) {
            throw new Error('El estado de la solicitud no es válido. Debe ser "aprobada" o "rechazada".');
        }

        if (!solicitudAdopcion) {
            throw new Error('Solicitud de adopción no encontrada.');
        }

        if (solicitudAdopcionData.rechazado_por_devolucion) {
            solicitudAdopcionData.estado = 'rechazada';
            await PerroRepository.updatePerro(solicitudAdopcion.id_perro, { id_estado: 5 });
        }

        return SolicitudAdopcionRepository.updateSolicitudAdopcion(id, solicitudAdopcionData);
    },

    deleteSolicitudAdopcion: async (id) => {
        return SolicitudAdopcionRepository.deleteSolicitudAdopcion(id);
    }
};

export default SolicitudAdopcionService;