// ia.repository.js
import { Adoptante, Criterio, Perro, Test } from '../../models/index.js';

const IARepository = {
    getAdoptanteById: async (idAdoptante) => {
        return Adoptante.findByPk(idAdoptante);
    },

    getAllPerros: async () => {
        return Perro.findAll();
    },

    getCriteriosByAdoptanteId: async (idAdoptante) => {
        return Criterio.findAll({ where: { id_adoptante: idAdoptante } });
    }
};

export default IARepository;
