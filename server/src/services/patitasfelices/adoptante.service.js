import AdoptanteRepository from '../../repositories/patitasfelices/adoptante.repository.js';
import UsuarioRepository from '../../repositories/patitasfelices/usuario.repository.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

const AdoptanteService = {
    createAdoptante: async (adoptanteData) => {
        const { cedula, email, contrasena, edad, nombre, apellido, genero, direccion, telefono } = adoptanteData;

        // Verificación de edad
        if (edad < 18) {
            throw new Error('El adoptante debe tener al menos 18 años.');
        }

        // Verificación de cédula y email únicos
        const existingAdoptante = await AdoptanteRepository.getAllAdoptantes({
            where: {
                [Op.or]: [
                    { cedula },
                    { email }
                ]
            }
        });

        if (existingAdoptante.length > 0) {
            throw new Error('La cédula o el email ya están registrados.');
        }

        // Validación de la contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(contrasena)) {
            throw new Error('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.');
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear el usuario
        const usuarioData = {
            nombre,
            apellido,
            email,
            contrasena: hashedPassword,
            nivel_acceso: 'bajo',
            tipo: 'adoptante'
        };
        const usuario = await UsuarioRepository.createUsuario(usuarioData);

        // Crear el adoptante con el id_usuario del usuario recién creado
        adoptanteData.id_usuario = usuario.id_usuario;
        adoptanteData.contrasena = hashedPassword;

        return AdoptanteRepository.createAdoptante(adoptanteData);
    },

    getAllAdoptantes: async () => {
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

    loginAdoptante: async (email, contrasena) => {
        const adoptante = await AdoptanteRepository.getAllAdoptantes({
            where: { email }
        });

        if (adoptante.length === 0) {
            throw new Error('Email o contraseña incorrectos.');
        }

        const validPassword = await bcrypt.compare(contrasena, adoptante[0].contrasena);

        if (!validPassword) {
            throw new Error('Email o contraseña incorrectos.');
        }

        return adoptante[0];
    }
};

export default AdoptanteService;
