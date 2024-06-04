import { Usuario } from '../models/patitasfelices/usuarios_model.js';
import { createAdoptante } from './adoptante.controller.js';

// Crear un nuevo usuario
//esta funcion va traer todos los atributos para crear usuario
export const createUsuario = async (req, res) => {
    
    try {
        const { nombre, apellido,email,contrasena,tipo } = req.body;
        
        const newUsuario = await Usuario.create(req.body);
        res.status(201).json(newUsuario);
        //
        createAdoptante()
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            await usuario.update(req.body);
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            await usuario.destroy();
            res.status(204).json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
