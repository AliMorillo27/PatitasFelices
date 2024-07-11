import { SolicitudAdopcionRepository, AdoptanteRepository, PerroRepository } from '../../repositories/index.js';
import { Op } from 'sequelize';
import sendEmail from './email.service.js';

const SolicitudAdopcionService = {
    createSolicitudAdopcion: async (solicitudAdopcionData) => {
        const { id_adoptante, id_perro, estado } = solicitudAdopcionData;

        // Establecer estado por defecto a 'pendiente' y fecha de solicitud a la fecha actual
        solicitudAdopcionData.estado = 'pendiente';
        solicitudAdopcionData.fechaSolicitud = new Date();

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

        const nuevaSolicitud = await SolicitudAdopcionRepository.createSolicitudAdopcion(solicitudAdopcionData);

        // Obtener detalles del adoptante y del perro
        const adoptante = await AdoptanteRepository.getAdoptanteById(id_adoptante);
        const perro = await PerroRepository.getPerroById(id_perro);

        // Enviar notificación por correo electrónico al administrador
        const adminEmail = process.env.ADMIN_EMAIL;
        const subject = 'Nueva solicitud de adopción';
        const text = `Hola,\n\nSe ha creado una nueva solicitud de adopción para el perro ${perro.nombre} por el adoptante ${adoptante.nombre} ${adoptante.apellido}.\n\nSaludos,\nEquipo Patitas Felices`;

        await sendEmail(adminEmail, subject, text);

        return nuevaSolicitud;
    },

    getAllSolicitudesAdopcion: async ({ page = 1, estado }) => {
        const limit = 10;  // Número de solicitudes por página
        const offset = (page - 1) * limit;
        let where = {};

        if (estado) {
            where.estado = estado;
        }

        const { rows, count } = await SolicitudAdopcionRepository.getAllSolicitudesAdopcion({
            where,
            limit,
            offset
        });

        return {
            solicitudes: rows,
            totalPages: Math.ceil(count / limit)
        };
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

        // Lógica para actualizar el estado de la solicitud y el estado del perro
        if (solicitudAdopcionData.rechazado_por_devolucion !== undefined) {
            if (solicitudAdopcionData.rechazado_por_devolucion) {
                solicitudAdopcionData.estado = 'rechazada';
                await PerroRepository.updatePerro(solicitudAdopcion.id_perro, { id_estado: 5 });
            } else if (!solicitudAdopcionData.rechazado_por_devolucion) {
                solicitudAdopcionData.estado = 'aprobada';
                await PerroRepository.updatePerro(solicitudAdopcion.id_perro, { id_estado: 2 });
            }
        }

        if (solicitudAdopcionData.estado === 'aprobada') {
            await PerroRepository.updatePerro(solicitudAdopcion.id_perro, { id_estado: 2 });
        } else if (solicitudAdopcionData.estado === 'rechazada') {
            solicitudAdopcionData.rechazado_por_devolucion = false;
            await PerroRepository.updatePerro(solicitudAdopcion.id_perro, { id_estado: 1 });
        }

        const updatedSolicitud = await SolicitudAdopcionRepository.updateSolicitudAdopcion(id, solicitudAdopcionData);

        // Obtener detalles del adoptante y del perro
        const adoptante = await AdoptanteRepository.getAdoptanteById(solicitudAdopcion.id_adoptante);
        const perro = await PerroRepository.getPerroById(solicitudAdopcion.id_perro);

        // Enviar notificación por correo electrónico
        if (solicitudAdopcionData.estado === 'aprobada' || solicitudAdopcionData.estado === 'rechazada') {
            const estado = solicitudAdopcionData.estado === 'aprobada' ? 'aprobada' : 'rechazada';
            const subject = `Solicitud de adopción ${estado}`;
            const text = `Hola ${adoptante.nombre} ${adoptante.apellido},\n\nTu solicitud de adopción para el perro ${perro.nombre} ha sido ${estado}. Gracias por tu interés en adoptar uno de nuestros perros.\n\nSaludos,\nEquipo Patitas Felices`;

            await sendEmail(adoptante.email, subject, text);
        }

        return updatedSolicitud;
    },

    deleteSolicitudAdopcion: async (id) => {
        return SolicitudAdopcionRepository.deleteSolicitudAdopcion(id);
    }
};

export default SolicitudAdopcionService;
