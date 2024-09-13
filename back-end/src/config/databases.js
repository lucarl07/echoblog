import dotenv from "dotenv"

dotenv.config()

let db = {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}

if (process.env.NODE_ENV === 'test') {
  db = {
    name: process.env.TDB_NAME,
    user: process.env.TDB_USER,
    password: process.env.TDB_PASSWORD
  }
}

export default db;