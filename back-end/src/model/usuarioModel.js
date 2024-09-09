import conn from "../config/dbconfig.js";
import { DataTypes } from "sequelize";

const Usuario = conn.define("usuarios", {
  usuario_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.TEXT('tiny'),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  papel: {
    type: DataTypes.ENUM,
    values: ["administrador", "autor", "leitor"],
    defaultValue: "leitor"
  }
})

export default Usuario;