// Dependencies:
import "dotenv/config"
import express from "express"
import cors from "cors";

// Database connection:
import conn from "./config/dbconfig.js"

// Initializing Express:
const app = express();

// Declaring the server port:
const PORT = process.env.PORT

// Global middleware:
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// When the server starts:
conn.sync().then(() => {
  app.listen(PORT, () => {
    console.clear()
    console.log(`| Bem-vindo ao ECHOBLOG! 💻 |`)
    console.log(`| Servidor na porta: ${PORT} 🚀 |`)
    console.log(`| Banco de dados conectado.  |\n`)
  })
}).catch((error) => console.error(error))

// Default unknown route:
app.use("/", (res) => {
  res.status(404).json({
    message: "Rota não encontrada.",
    tip: "Verifique se você digitou o URL corretamente."
  })
})