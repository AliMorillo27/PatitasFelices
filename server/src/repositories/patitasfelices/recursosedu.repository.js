import { Recursoedu } from '../../models/index.js';

const RecursoEduRepository = {
    async getAllRecursos() {
        return await Recursoedu.findAll();
    },

    async getRecursoById(id) {
        return await Recursoedu.findByPk(id);
    },

    async createRecurso(recurso) {
        return await Recursoedu.create(recurso);
    },

    async updateRecurso(id, recurso) {
        const existingRecurso = await Recursoedu.findByPk(id);
        if (existingRecurso) {
            return await existingRecurso.update(recurso);
        }
        return null;
    },

    async deleteRecurso(id) {
        const recurso = await Recursoedu.findByPk(id);
        if (recurso) {
            await recurso.destroy();
            return true;
        }
        return false;
    }
};

export default RecursoEduRepository;