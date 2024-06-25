import { Adoptante } from './adoptante.model.js';
import { Criterio } from './criterio.model.js';
import { Estado } from './estado.model.js';
import { HistoriaAdopcion } from './historiaadopcion.model.js';
import { Perro } from './perro.model.js';
import { Recursoedu } from './recursoedu.model.js';
import { SolicitudAdopcion } from './solicitudadop.model.js';
import { Test } from './test.model.js';
import { Usuario } from './usuarios.model.js';

// Adoptante
Adoptante.hasMany(Test, { foreignKey: 'id_adoptante' });
Test.belongsTo(Adoptante, { foreignKey: 'id_adoptante' });

Adoptante.hasMany(SolicitudAdopcion, { foreignKey: 'id_adoptante' });
SolicitudAdopcion.belongsTo(Adoptante, { foreignKey: 'id_adoptante' });

Adoptante.hasMany(Criterio, { foreignKey: 'id_adoptante' });
Criterio.belongsTo(Adoptante, { foreignKey: 'id_adoptante' });

Adoptante.hasMany(HistoriaAdopcion, { foreignKey: 'id_adoptante' });
HistoriaAdopcion.belongsTo(Adoptante, { foreignKey: 'id_adoptante' });

// Perro
Perro.hasMany(Test, { foreignKey: 'id_perro' });
Test.belongsTo(Perro, { foreignKey: 'id_perro' });

Perro.hasMany(SolicitudAdopcion, { foreignKey: 'id_perro' });
SolicitudAdopcion.belongsTo(Perro, { foreignKey: 'id_perro' });

Perro.hasMany(HistoriaAdopcion, { foreignKey: 'id_perro' });
HistoriaAdopcion.belongsTo(Perro, { foreignKey: 'id_perro' });

Estado.hasMany(Perro, { foreignKey: 'id_estado' });
Perro.belongsTo(Estado, { foreignKey: 'id_estado' });

// Usuario
Usuario.hasOne(Adoptante, { foreignKey: 'id_usuario' });
Adoptante.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Usuario.hasMany(Recursoedu, { foreignKey: 'id_usuario' });
Recursoedu.belongsTo(Usuario, { foreignKey: 'id_usuario' });
