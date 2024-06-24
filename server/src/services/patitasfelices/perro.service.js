import { sequelize } from "../../database/database.js";
import { Perro } from "../../models/index.js";
import { PerroRepository } from "../../repositories/index.js";

const PerroService = {
  createPerro: async (perroData) => {
    const t = await sequelize.transaction();
    try {
      const existingDOG = await Perro.findOne({
        name: perroData.nombre ,
        
      });
      if (perroData.nombre.length <= 1) {
        throw new Error("El nombre es muy corto");
      }
       if (!perroData.raza) {
        throw new Error('La raza debe estar especificada.');
      }

      //*if (!perroData.id_estado) {
        //throw new Error('El perro debe tener un estado asignado.');
      //}

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
