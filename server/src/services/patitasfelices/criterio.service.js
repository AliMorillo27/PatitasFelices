import { sequelize } from "../../database/database.js";
import { CriterioRepository } from "../../repositories/index.js";

const CriterioService = {
  createCriterio: async (criterioData) => {
    const t = await sequelize.transaction();
    try {
      const newCriterio = await CriterioRepository.createCriterio(criterioData, t);
      await t.commit();
      return newCriterio;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  getAllCriterios: async () => {
    return CriterioRepository.getAllCriterios();
  },

  getCriterioById: async (id) => {
    return CriterioRepository.getCriterioById(id);
  },

  updateCriterio: async (id, criterioData) => {
    return CriterioRepository.updateCriterio(id, criterioData);
  },

  deleteCriterio: async (id) => {
    return CriterioRepository.deleteCriterio(id);
  },
};

export default CriterioService;
