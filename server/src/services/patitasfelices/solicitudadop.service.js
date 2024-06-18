/*const adoptionRequestRepository = require('../repositories/adoptionRequestRepository');
const userRepository = require('../repositories/userRepository');
const dogRepository = require('../repositories/dogRepository');
const adopterRepository = require('../repositories/adopterRepository');*/

const createAdoptionRequest = async (adoptionRequestData) => {
  const { id_usuario, id_adoptante, id_perro } = adoptionRequestData;

  /* Verificar la existencia del usuario
  const user = await userRepository.getUserById(id_usuario);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }*/

  // Verificar la existencia del adoptante
  const adopter = await adopterRepository.getAdopterById(id_adoptante);
  if (!adopter) {
    throw new Error('Adoptante no encontrado');
  }

  // Verificar la existencia del perro
  const dog = await dogRepository.getDogById(id_perro);
  if (!dog) {
    throw new Error('Perro no encontrado');
  }

  // Verificar el estado del perro
  if (!dog.estado === 'disponible') {
    throw new Error('El perro no está disponible para adopción');
  }

  // Verificar la unicidad de la solicitud
  const existingRequest = await adoptionRequestRepository.findActiveRequest(id_adoptante, id_perro);
  if (existingRequest) {
    throw new Error('Ya existe una solicitud activa para este perro por el mismo adoptante');
  }

  /* Verificar la edad del adoptante
  if (adopter.edad < 18) {
    throw new Error('El adoptante debe tener al menos 18 años');
  }*/

  

  // Crear la solicitud de adopción
  const adoptionRequest = await adoptionRequestRepository.createAdoptionRequest(adoptionRequestData);
  return adoptionRequest;
};

module.exports = {
  createAdoptionRequest
};
