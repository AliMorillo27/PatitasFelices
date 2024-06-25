import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';

export const HistoriaAdopcion = sequelize.define('tb_historia_adopcion', {
  id_adopcion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_adoptante: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tb_adoptante',
      key: 'id_adoptante'
    }
  },
  id_perro: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tb_perro',
      key: 'id_perro'
    }
  },
  fecha_adopcion: {
    type: DataTypes.DATE,
  },
  exito: {
    type: DataTypes.BOOLEAN,
  }
}, {
  schema: "patitasfelices",
  tableName: 'tb_historia_adopcion',
  timestamps: true,
});
