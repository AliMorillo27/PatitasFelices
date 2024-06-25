import { Usuario } from './patitasfelices/usuarios.model.js';
import { Adoptante } from './patitasfelices/adoptante.model.js';
import { Perro } from './patitasfelices/perro.model.js';
import { Estado } from './patitasfelices/estado.model.js';
import { SolicitudAdopcion } from './patitasfelices/solicitudadop.model.js';
import { Test } from './patitasfelices/test.model.js';
import { Criterio } from './patitasfelices/criterio.model.js';
import { Recursoedu } from './patitasfelices/recursoedu.model.js';
import { HistoriaAdopcion } from './patitasfelices/historiaadopcion.model.js';

// Importar relaciones después de inicializar los modelos
import './patitasfelices/relationships.js';

export {
    Usuario,
    Adoptante,
    Perro,
    Estado,
    SolicitudAdopcion,
    Test,
    Criterio,
    Recursoedu,
    HistoriaAdopcion,
};
