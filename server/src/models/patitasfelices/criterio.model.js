import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';

export const Criterio = sequelize.define('tb_criterio', {
  id_criterio: {
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
  clave_preferencia: {
    type: DataTypes.STRING(50),
  },
  valor_preferencia: {
    type: DataTypes.STRING(100),
  },
  peso: {
    type: DataTypes.INTEGER,
  },
  ultima_actualizacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  schema: "patitasfelices",
  tableName: 'tb_criterio',
  timestamps: true,
});
