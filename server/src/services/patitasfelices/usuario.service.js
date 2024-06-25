import { UsuarioRepository } from '../../repositories/index.js';
import bcrypt from 'bcrypt';

const UsuarioService = {
    createUsuario: async (usuarioData) => {
        const { contrasena } = usuarioData;

        // Validación de la contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(contrasena)) {
            throw new Error('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.');
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        usuarioData.contrasena = hashedPassword;

        return UsuarioRepository.createUsuario(usuarioData);
    },

    getAllUsuarios: async () => {
        return UsuarioRepository.getAllUsuarios();
    },

    getUsuarioById: async (id) => {
        return UsuarioRepository.getUsuarioById(id);
    },

    updateUsuario: async (id, usuarioData) => {
        return UsuarioRepository.updateUsuario(id, usuarioData);
    },

    deleteUsuario: async (id) => {
        return UsuarioRepository.deleteUsuario(id);
    },

    loginUsuario: async (email, contrasena) => {
        const usuario = await UsuarioRepository.getAllUsuarios({
            where: { email }
        });

        if (usuario.length === 0) {
            throw new Error('Email o contraseña incorrectos.');
        }

        const validPassword = await bcrypt.compare(contrasena, usuario[0].contrasena);

        if (!validPassword) {
            throw new Error('Email o contraseña incorrectos.');
        }

        return usuario[0];
    }
};

export default UsuarioService;
