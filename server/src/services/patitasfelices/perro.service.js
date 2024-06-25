import { PerroRepository, EstadoRepository } from '../../repositories/index.js';

const PerroService = {
    createPerro: async (perroData) => {
        const { nombre, edad, raza, tamano, genero, descripcion, nivel_energia, bueno_con_ninos, bueno_con_mascota, nivel_formacion, id_estado } = perroData;

        // Verificación de campos obligatorios
        if (!nombre || !edad || !raza || !tamano || !genero || !descripcion || !nivel_energia || !bueno_con_ninos || !bueno_con_mascota|| !nivel_formacion) {
            throw new Error('Todos los campos obligatorios deben estar completos.');
        }

        // Verificación del estado del perro
        const estadoValido = await EstadoRepository.getEstadoById(id_estado);
        if (!estadoValido) {
            throw new Error('El estado del perro no es válido.');
        }

        return PerroRepository.createPerro(perroData);
    },

    getAllPerros: async () => {
        return PerroRepository.getAllPerros();
    },

    getPerroById: async (id) => {
        return PerroRepository.getPerroById(id);
    },

    getPerrosPorTamano: async (tamano) => {
        return PerroRepository.getAllPerros({
            where: {
                tamano: tamano
            }
        });
    },
    getPerrosPorEstado: async (estado) => {
        return PerroRepository.getAllPerros({
            where: {
                id_estado: estado
            }
        });
    },
    updatePerro: async (id, perroData) => {
        const existingPerro = await PerroRepository.getPerroById(id);

        if (!existingPerro) {
            throw new Error('El perro no existe.');
        }

        const updatedPerroData = {
            ...existingPerro.dataValues,
            ...perroData
        };

        const {
            nombre,
            edad,
            raza,
            tamano,
            genero,
            descripcion,
            nivel_energia,
            bueno_con_ninos,
            bueno_con_mascota,
            nivel_formacion,
            id_estado
        } = updatedPerroData;

        // Verificación de campos obligatorios
        if (
            !nombre ||
            edad === undefined ||
            !raza ||
            tamano === undefined ||
            !genero ||
            !descripcion ||
            nivel_energia === undefined ||
            !bueno_con_ninos ||
            !bueno_con_mascota ||
            !nivel_formacion ||
            id_estado === undefined
        ) {
            throw new Error('Todos los campos obligatorios deben estar completos.');
        }

        // Validación de estados del perro
        if (id_estado) {
            const estado = await EstadoRepository.getEstadoById(id_estado);
            if (!estado) {
                throw new Error('El estado del perro no es válido.');
            }
        }

        return PerroRepository.updatePerro(id, updatedPerroData);
    },

    deletePerro: async (id) => {
        return PerroRepository.deletePerro(id);
    }
};

export default PerroService;
