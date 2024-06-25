import { sequelize } from "../../database/database.js";
import { UsuarioRepository } from "../../repositories/index.js";

const UsuarioService = {
  createUsuario: async (usuarioData) => {
    const t = await sequelize.transaction();
    try {
      const newUsuario = await UsuarioRepository.createUsuario(usuarioData, t);
      if (usuarioData.nombre.length <= 1) {
        throw new Error("ingrese un nombre valido");
      }
      if (usuarioData.cedula.length <= 9) {
        throw new Error("ingrese una cédula valida");
      }

      if (usuarioData.tipo === "Adoptante") {
        await UsuarioRepository.createAdoptante(
          {
            id_usuario: newUsuario.id_usuario,
            nombre: usuarioData.nombre,
            apellido: usuarioData.apellido,
            cedula: usuarioData.cedula,
            genero: usuarioData.genero,
            direccion: usuarioData.direccion,
            telefono: usuarioData.telefono,
            email: usuarioData.email,
            contraseña: usuarioData.contraseña,
            edad: usuarioData.edad,
            tiene_ninos: usuarioData.tiene_ninos,
            tiene_mascota: usuarioData.tiene_mascota,
            nivel_actividad: usuarioData.nivel_actividad,
            nivel_energia: usuarioData.nivel_energia,
            tamaño_perro_preferido: usuarioData.tamaño_perro_preferido,
            experiencia_con_perros: usuarioData.experiencia_con_perros,
          },
          t
        );
      }

      await t.commit();
      return newUsuario;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  getUsuarios: async () => {
    return UsuarioRepository.findAllUsuarios();
  },

  getUsuarioById: async (id) => {
    const usuario = await UsuarioRepository.findUsuarioById(id);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
    return usuario;
  },

  updateUsuario: async (id, usuarioData) => {
    const usuario = await UsuarioRepository.findUsuarioById(id);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
    return UsuarioRepository.updateUsuario(usuario, usuarioData);
  },

  deleteUsuario: async (id) => {
    const usuario = await UsuarioRepository.findUsuarioById(id);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
    return UsuarioRepository.deleteUsuario(usuario);
  },
};

export default UsuarioService;
