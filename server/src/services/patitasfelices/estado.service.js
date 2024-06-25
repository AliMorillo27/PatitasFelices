import { sequelize } from "../../database/database.js";
import { EstadoRepository } from "../../repositories/index.js";

const EstadoService = {
  createEstado: async (estadoData) => {
    const t = await sequelize.transaction();
    try {
      const newEstado = await EstadoRepository.createEstado(estadoData, t);
      await t.commit();
      return newEstado;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  getAllEstados: async () => {
    return EstadoRepository.getAllEstados();
  },

  getEstadoById: async (id) => {
    return EstadoRepository.getEstadoById(id);
  },

  updateEstado: async (id, estadoData) => {
    return EstadoRepository.updateEstado(id, estadoData);
  },

  deleteEstado: async (id) => {
    return EstadoRepository.deleteEstado(id);
  },
};

export default EstadoService;
