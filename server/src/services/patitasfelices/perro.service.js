import { sequelize } from "../../database/database.js";
import { PerroRepository } from "../../repositories/index.js";

const PerroService = {
  createPerro: async (perroData) => {
    const t = await sequelize.transaction();
    try {
      if (!perroData.nombre || !perroData.edad || !perroData.raza) {
        throw new Error('Faltan datos obligatorios del perro.');
      }
      if (!perroData.id_estado) {
        throw new Error('El perro debe tener un estado asignado.');
      }

      const newPerro = await PerroRepository.createPerro(perroData, t);
      await t.commit();
      return newPerro;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  getAllPerros: async () => {
    return PerroRepository.getAllPerros();
  },

  getPerroById: async (id) => {
    return PerroRepository.getPerroById(id);
  },

  updatePerro: async (id, perroData) => {
    return PerroRepository.updatePerro(id, perroData);
  },

  deletePerro: async (id) => {
    return PerroRepository.deletePerro(id);
  },
};

export default PerroService;
