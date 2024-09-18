// Dependencies:
import "dotenv/config"
import express from "express"
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Database connection:
import conn from "./config/dbconfig.js"

// Initializing models:
import Postagem from "./model/postagemModel.js";
import Usuario from "./model/usuarioModel.js";
import Comentario from "./model/comentarioModel.js";

// Importing routers:
import postagemRouter from "./routes/postagemRoutes.js"
import usuarioRouter from "./routes/usuarioRoutes.js"

// Initializing Express:
const app = express();

// Path constraints:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global middleware:
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use("/public", express.static(path.join(__dirname, "public")));

// Declaring the server port:
const PORT = process.env.PORT || 3333

// When the server starts:
conn.sync().then(() => {
  app.listen(PORT, () => {
    console.clear()
    console.log(`| Bem-vindo ao ECHOBLOG! 💻 |`)
    console.log(`| Servidor na porta: ${PORT} 🚀 |`)
    console.log(`| Banco de dados conectado.  |\n`)
  })
}).catch((error) => console.error(error))

// Using routes:
app.use("/postagens", postagemRouter)
app.use("/usuarios", usuarioRouter)

// Default unknown route:
app.use("/", (req, res) => {
  res.status(404).json({
    message: "Rota não encontrada.",
    tip: "Verifique se você digitou o URL corretamente."
  })
})