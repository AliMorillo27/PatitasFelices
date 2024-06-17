import { UsuarioService } from "../../services/index.service.js";

export const createUsuario = async (req, res) => {
  try {
    const newUsuario = await UsuarioService.createUsuario(req.body);
    res.status(201).json(newUsuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioService.getUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const usuario = await UsuarioService.getUsuarioById(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const usuario = await UsuarioService.updateUsuario(req.params.id, req.body);
    res.status(200).json(usuario);
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    await UsuarioService.deleteUsuario(req.params.id);
    res.status(204).json({ message: "Usuario eliminado" });
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
