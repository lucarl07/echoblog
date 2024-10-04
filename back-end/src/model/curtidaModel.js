// Dependencies:
import conn from "../config/dbconfig.js";
import { DataTypes } from "sequelize";

// Related models:
import Postagem from './postagemModel.js'
import Usuario from './usuarioModel.js'

const Curtida = conn.define('curtidas', {
  curtida_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
}, {
  tableName: "curtidas"
})

// Relationships:
Usuario.belongsToMany(Postagem, { 
  through: 'curtidas',
  foreignKey: 'usuario_id'
})
Postagem.belongsToMany(Usuario, { 
  through: 'curtidas',
  foreignKey: 'postagem_id'
})

export default Curtida;