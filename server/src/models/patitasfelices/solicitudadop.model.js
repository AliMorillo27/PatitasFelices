import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';

export const SolicitudAdopcion = sequelize.define('tb_solicitudadopcion', {
  idSolicitud: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechaSolicitud: {
    type: DataTypes.DATE,
  },
  comentario: {
    type: DataTypes.STRING(100),
  },
  descripcion: {
    type: DataTypes.STRING(100),
  },
  estado: {
    type: DataTypes.STRING(100),
  },
  rechazado_por_devolucion: {  // Nuevo atributo
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  schema: "patitasfelices",
  tableName: 'tb_solicitudadopcion',
  timestamps: true,
});
