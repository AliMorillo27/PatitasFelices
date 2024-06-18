import { Estado } from '../models/patitasfelices/estado.model.js';

export class EstadoRepository {
    async getAllEstados() {
        return await Estado.findAll();
    }

    async getEstadoById(id) {
        return await Estado.findByPk(id);
    }

    async createEstado(estado) {
        return await Estado.create(estado);
    }

    async updateEstado(id, estado) {
        const existingEstado = await Estado.findByPk(id);
        if (existingEstado) {
            return await existingEstado.update(estado);
        }
        return null;
    }

    async deleteEstado(id) {
        const estado = await Estado.findByPk(id);
        if (estado) {
            await estado.destroy();
            return true;
        }
        return false;
    }
}
