import conn from "../config/dbconfig.js";
import { DataTypes } from "sequelize";
import Usuario from './usuarioModel.js'

const Postagem = conn.define("postagens", {
  postagem_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.TEXT('tiny'),
    allowNull: false,
    required: true,
  },
  conteudo: {
    type: DataTypes.TEXT('medium'),
    allowNull: false,
    required: true,
  },
  dataPublicacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

Postagem.belongsTo(Usuario, {
  foreignKey: {
    name: "autor_id"
  }
});

export default Postagem;