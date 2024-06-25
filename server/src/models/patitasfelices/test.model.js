import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';

export const Test = sequelize.define('tb_test', {
  id_test: {
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
  fecha_interaccion: {
    type: DataTypes.DATE,
  },
  tipo_interaccion: {
    type: DataTypes.STRING(50),
  },
  duracion_interaccion: {
    type: DataTypes.INTEGER,
  },
  calificacion: {
    type: DataTypes.INTEGER,
  }
}, {
  schema: "patitasfelices",
  tableName: 'tb_test',
  timestamps: true,
});
