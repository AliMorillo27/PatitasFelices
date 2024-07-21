import AdoptanteRepository from '../../repositories/patitasfelices/adoptante.repository.js'; // Ajusta la ruta según la estructura de tu proyecto
import UsuarioRepository from '../../repositories/patitasfelices/usuario.repository.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

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

        if (usuarioData.tipo === 'administrador') {
            const existingAdmin = await UsuarioRepository.getUsuariosByTipo('administrador');
            if (existingAdmin.length > 0) {
                throw new Error('Ya existe un administrador en el sistema.');
            }
        }

        if (usuarioData.tipo === 'empleado') {
            const existingEmpleados = await UsuarioRepository.getUsuariosByTipo('empleado');
            if (existingEmpleados.length >= 2) {
                throw new Error('No se pueden agregar más de 2 empleados en el sistema.');
            }
        }

        return UsuarioRepository.createUsuario(usuarioData);
    },

    getAllUsuarios: async (query) => {
        const { tipo } = query;
        return UsuarioRepository.getAllUsuarios({ where: { tipo } });
    },

    getUsuarioById: async (id) => {
        return UsuarioRepository.getUsuarioById(id);
    },

    updateUsuario: async (id, usuarioData) => {
        return UsuarioRepository.updateUsuario(id, usuarioData);
    },

    deleteUsuario: async (id) => {
        const usuario = await UsuarioRepository.getUsuarioById(id);
        if (usuario.tipo === 'administrador') {
            throw new Error('No se puede eliminar al administrador.');
        }
        return UsuarioRepository.deleteUsuario(id);
    },

    loginUsuario: async (email, contrasena) => {
        const usuarios = await UsuarioRepository.getAllUsuarios({
            where: { email }
        });

        if (usuarios.length === 0) {
            throw new Error('Email o contraseña incorrectos.');
        }

        const usuario = usuarios[0];
        const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!validPassword) {
            throw new Error('Email o contraseña incorrectos.');
        }

        let id_adoptante = null;
        if (usuario.tipo === 'adoptante') {
            const adoptante = await AdoptanteRepository.getAdoptanteByUsuarioId(usuario.id_usuario);
            id_adoptante = adoptante ? adoptante.id_adoptante : null;
        }

        return {
            id_usuario: usuario.id_usuario,
            tipo: usuario.tipo,
            id_adoptante: id_adoptante
        };
    },

    solicitarRestablecimientoContrasena: async (email) => {
        const usuario = await UsuarioRepository.getAllUsuarios({
            where: { email }
        });

        if (usuario.length === 0) {
            throw new Error('No existe un usuario con ese correo electrónico.');
        }

        const token = jwt.sign({ id: usuario[0].id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const enlaceRestablecimiento = `http://localhost:3001/restablecer-contrasena?token=${token}`;

        await sendEmail(email, 'Restablecimiento de Contraseña', `Utiliza el siguiente enlace para restablecer tu contraseña: ${enlaceRestablecimiento}`);
    },

    restablecerContrasena: async (token, nuevaContrasena) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const usuario = await UsuarioRepository.getUsuarioById(decoded.id);

            if (!usuario) {
                throw new Error('Token inválido o expirado.');
            }

            const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
            usuario.contrasena = hashedPassword;
            await usuario.save();
        } catch (error) {
            throw new Error('Token inválido o expirado.');
        }
    }
};

export default UsuarioService;
