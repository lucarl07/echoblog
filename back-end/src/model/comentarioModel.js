// Dependencies:
import conn from "../config/dbconfig.js";
import { DataTypes } from "sequelize";

// Models:
import Postagem from "./postagemModel.js";
import Usuario from "./usuarioModel.js";

const Comentario = conn.define(
  "comentarios",
  {
    comentario_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    conteudo: {
      type: DataTypes.TEXT("medium"),
      allowNull: false,
      required: true,
    },
  },
  { tableName: "comentarios" }
);

Usuario.belongsToMany(Postagem, { 
  through: { 
    model: Comentario, 
    unique: false 
  }
})
Postagem.belongsToMany(Usuario, { 
  through: { 
    model: Comentario, 
    unique: false 
  }
})

export default Comentario;