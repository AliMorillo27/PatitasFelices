import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';

export const Estado = sequelize.define('tb_estado', {
  id_estado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  adoptado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  fallecido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  enfermo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  devuelto: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  schema: "patitasfelices",
  tableName: 'tb_estado',
  timestamps: true,
});
