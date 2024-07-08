import { Usuario } from '../../models/index.js';

const UsuarioRepository = {
    createUsuario: async (usuarioData, transaction) => {
        return Usuario.create(usuarioData, { transaction });
    },

    getAllUsuarios: async (query = {}) => {
        return Usuario.findAll(query);
    },

    getUsuarioById: async (id) => {
        return Usuario.findByPk(id);
    },

    getUsuariosByTipo: async (tipo) => {
        return Usuario.findAll({ where: { tipo } });
    },

    updateUsuario: async (id, usuarioData) => {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            return usuario.update(usuarioData);
        }
        return null;
    },

    deleteUsuario: async (id) => {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            await usuario.destroy();
            return true;
        }
        return false;
    }
};

export default UsuarioRepository;