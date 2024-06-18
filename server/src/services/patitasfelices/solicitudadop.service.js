import { sequelize } from "../../database/database.js";
import { SolicitudAdopcionRepository } from "../../repositories/index.js";

const SolicitudAdopcionService = {
  createSolicitud: async (solicitudData) => {
    const t = await sequelize.transaction();
    try {
      const newSolicitud = await SolicitudAdopcionRepository.createSolicitud(solicitudData, t);
      await t.commit();
      return newSolicitud;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  getAllSolicitudes: async () => {
    return SolicitudAdopcionRepository.getAllSolicitudes();
  },

  getSolicitudById: async (id) => {
    return SolicitudAdopcionRepository.getSolicitudById(id);
  },

  updateSolicitud: async (id, solicitudData) => {
    return SolicitudAdopcionRepository.updateSolicitud(id, solicitudData);
  },

  deleteSolicitud: async (id) => {
    return SolicitudAdopcionRepository.deleteSolicitud(id);
  },
};

export default SolicitudAdopcionService;
