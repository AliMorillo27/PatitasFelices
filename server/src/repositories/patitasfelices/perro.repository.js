import { Perro } from '../models/patitasfelices/perro.model.js';

export class PerroRepository {
    async getAllPerros() {
        return await Perro.findAll();
    }

    async getPerroById(id) {
        return await Perro.findByPk(id);
    }

    async createPerro(perro) {
        return await Perro.create(perro);
    }

    async updatePerro(id, perro) {
        const existingPerro = await Perro.findByPk(id);
        if (existingPerro) {
            return await existingPerro.update(perro);
        }
        return null;
    }

    async deletePerro(id) {
        const perro = await Perro.findByPk(id);
        if (perro) {
            await perro.destroy();
            return true;
        }
        return false;
    }
}
