import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import db from "./databases.js";

dotenv.config()

const conn = new Sequelize(db.name, db.user, db.password, {
  host: 'localhost',
  dialect: 'mysql'
})

export default conn;