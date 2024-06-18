import { sequelize } from "../../database/database.js";
import { RecursoEduRepository } from "../../repositories/index.js";

const RecursoEduService = {
  createRecurso: async (recursoData) => {
    const t = await sequelize.transaction();
    try {
      const newRecurso = await RecursoEduRepository.createRecurso(recursoData, t);
      await t.commit();
      return newRecurso;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  getAllRecursos: async () => {
    return RecursoEduRepository.getAllRecursos();
  },

  getRecursoById: async (id) => {
    return RecursoEduRepository.getRecursoById(id);
  },

  updateRecurso: async (id, recursoData) => {
    return RecursoEduRepository.updateRecurso(id, recursoData);
  },

  deleteRecurso: async (id) => {
    return RecursoEduRepository.deleteRecurso(id);
  },
};

export default RecursoEduService;
