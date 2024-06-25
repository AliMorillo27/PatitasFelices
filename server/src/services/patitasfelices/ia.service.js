// ia.service.js
import IARepository from '../../repositories/patitasfelices/ia.repository.js';

const calcularCompatibilidad = (adoptante, perro, criterios) => {
    let puntaje = 0;

    if (perro.tamaño === adoptante.tamaño_perro_preferido) {
        puntaje += 1;
    }
    if (perro.nivel_energia <= adoptante.nivel_energia) {
        puntaje += 1;
    }
    if (perro.bueno_con_ninos === 'Si' && adoptante.tiene_ninos === 'SI') {
        puntaje += 1;
    }
    if (perro.bueno_con_mascota === 'Si' && adoptante.tiene_mascota === 'SI') {
        puntaje += 1;
    }

    return puntaje;
};

const IAService = {
    obtenerRecomendaciones: async (idAdoptante) => {
        const adoptante = await IARepository.getAdoptanteById(idAdoptante);
        const perros = await IARepository.getAllPerros();
        const criterios = await IARepository.getCriteriosByAdoptanteId(idAdoptante);

        perros.forEach(perro => {
            perro.puntaje = calcularCompatibilidad(adoptante, perro, criterios);
        });

        perros.sort((a, b) => b.puntaje - a.puntaje);

        return perros.slice(0, 5); // Retornar los 5 perros con mayor puntaje
    }
};

export default IAService;
