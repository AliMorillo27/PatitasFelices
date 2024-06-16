import { Usuario, Adoptante } from '../../models/index.js';

const UsuarioRepository = {
    createUsuario: async (usuarioData, transaction) => {
        return Usuario.create(usuarioData, { transaction });
    },
    findAllUsuarios: async () => {
        return Usuario.findAll();
    },
    findUsuarioById: async (id) => {
        return Usuario.findByPk(id);
    },
    updateUsuario: async (usuario, usuarioData) => {
        return usuario.update(usuarioData);
    },
    deleteUsuario: async (usuario) => {
        return usuario.destroy();
    },
    createAdoptante: async (adoptanteData, transaction) => {
        return Adoptante.create(adoptanteData, { transaction });
    },
};

export default UsuarioRepository;
