import { AdoptanteService } from "../../services/index.service.js";

export const createAdoptante = async (req, res) => {
  try {
    const adoptante = await AdoptanteService.createAdoptante(req.body);
    res.status(201).json(adoptante);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdoptantes = async (req, res) => {
  try {
    const adoptantes = await AdoptanteService.getAllAdoptantes();
    res.status(200).json(adoptantes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdoptanteById = async (req, res) => {
  try {
    const adoptante = await AdoptanteService.getAdoptanteById(req.params.id);
    if (adoptante) {
      res.status(200).json(adoptante);
    } else {
      res.status(404).json({ message: "Adoptante no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdoptante = async (req, res) => {
  try {
    const adoptante = await AdoptanteService.updateAdoptante(
      req.params.id,
      req.body
    );
    if (adoptante) {
      res.status(200).json(adoptante);
    } else {
      res.status(404).json({ message: "Adoptante no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdoptante = async (req, res) => {
  try {
    const success = await AdoptanteService.deleteAdoptante(req.params.id);
    if (success) {
      res.status(204).json({ message: "Adoptante eliminado" });
    } else {
      res.status(404).json({ message: "Adoptante no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
