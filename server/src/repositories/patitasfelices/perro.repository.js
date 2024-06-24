import { Perro } from '../../models/index.js';

const PerroRepository = {
    async createPerro(perro) {
        return await Perro.create(perro);
    }, 
    
    async getAllPerros() {
        return await Perro.findAll();
    },

    async getPerroById(id) {
        return await Perro.findByPk(id);
    },

   

    async updatePerro(id, perro) {
        const existingPerro = await Perro.findByPk(id);
        if (existingPerro) {
            return await existingPerro.update(perro);
        }
        return null;
    },

    deletePerro: async (id) => {
        const perro = await Perro.findByPk(id);
        if (perro) {
            await perro.destroy();
            return true;
        }
        return false;
    }
};

export default  PerroRepository;
