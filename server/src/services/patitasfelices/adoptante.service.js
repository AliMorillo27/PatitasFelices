import { sequelize } from "../../database/database.js";
import { Usuario } from "../../models/index.js";
import { AdoptanteRepository } from "../../repositories/index.js";

const AdoptanteService = {
  createAdoptante: async (adoptanteData) => {
    const t = await sequelize.transaction();
    try {
      // Verificar si el correo electrónico ya existe
      const existingUser = await Usuario.findOne({
        where: { email: adoptanteData.email },
      });
      if (existingUser) {
        throw new Error("El correo electrónico ya está en uso.");
      }

      // Crear usuario y adoptante dentro de la misma transacción
      const newUsuario = await Usuario.create(
        {
          nombre: adoptanteData.nombre,
          apellido: adoptanteData.apellido,
          email: adoptanteData.email,
          contraseña: adoptanteData.contraseña,
          nivel_acceso: "Usuario",
          tipo: "Adoptante",
        },
        { transaction: t }
      );

      adoptanteData.id_usuario = newUsuario.id_usuario;
      const newAdoptante = await AdoptanteRepository.createAdoptante(
        adoptanteData,
        t
      );

      await t.commit();
      return { usuario: newUsuario, adoptante: newAdoptante };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  getAllAdoptantes: async () => {
    console.log("Aqui llega?");
    return AdoptanteRepository.getAllAdoptantes();
  },

  getAdoptanteById: async (id) => {
    return AdoptanteRepository.getAdoptanteById(id);
  },

  updateAdoptante: async (id, adoptanteData) => {
    return AdoptanteRepository.updateAdoptante(id, adoptanteData);
  },

  deleteAdoptante: async (id) => {
    return AdoptanteRepository.deleteAdoptante(id);
  },
};

export default AdoptanteService;
