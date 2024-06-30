// src/services/patitasfelices/recommendation.service.js
import axios from 'axios';
import { Perro } from '../../models/patitasfelices/perro.model.js';
import { Adoptante } from '../../models/patitasfelices/adoptante.model.js';

const getForAdoptante = async (adoptanteId) => {
    try {
        const adoptante = await getAdoptante(adoptanteId);
        const perros = await getPerros();
        const preferences = generatePreferences(adoptante);
        console.log('Sending request to Flask with preferences and perros:', preferences, perros); // Agregar detalles para la depuración
        const response = await axios.post('http://localhost:5000/recommend', {
            preferences,
            perros
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error.message);
        throw new Error(`Error fetching recommendations: ${error.message}`);
    }
};

const getForVisitor = async (preferences) => {
    try {
        const perros = await getPerros();
        console.log('Sending request to Flask with preferences and perros:', preferences, perros); // Agregar detalles para la depuración
        const response = await axios.post('http://localhost:5000/recommend', {
            preferences,
            perros
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations for visitor:', error.message);
        throw new Error(`Error fetching recommendations for visitor: ${error.message}`);
    }
};

const getAdoptante = async (adoptanteId) => {
    try {
        const adoptante = await Adoptante.findByPk(adoptanteId);
        if (!adoptante) throw new Error(`Adoptante with id ${adoptanteId} not found`);
        return adoptante.toJSON();
    } catch (error) {
        console.error('Error fetching adoptante:', error.message);
        throw new Error(`Error fetching adoptante: ${error.message}`);
    }
};

const getPerros = async () => {
    try {
        const perros = await Perro.findAll({
            where: {
                id_estado: [1, 5]
            },
            attributes: ['id_perro', 'nombre', 'edad', 'raza', 'tamano', 'genero', 'descripcion']
        });
        return perros.map(perro => perro.toJSON());
    } catch (error) {
        console.error('Error fetching perros:', error.message);
        throw new Error(`Error fetching perros: ${error.message}`);
    }
};

const generatePreferences = (adoptante) => {
    return `
        tiene_ninos: ${adoptante.tiene_ninos}
        tiene_mascota: ${adoptante.tiene_mascota}
        nivel_actividad: ${adoptante.nivel_actividad}
        nivel_energia: ${adoptante.nivel_energia}
        tamano_perro_preferido: ${adoptante.tamano_perro_preferido}
        experiencia_con_perros: ${adoptante.experiencia_con_perros}
    `;
};

export default {
    getForAdoptante,
    getForVisitor
};
