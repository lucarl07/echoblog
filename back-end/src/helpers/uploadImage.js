// Dependencies:
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Path constraints:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = '';

    if (req.baseUrl.includes("postagens")) {
      folder = "postagens"
    }
    if (req.baseUrl.includes("usuarios")) {
      folder = "usuarios"
    }

    cb(null, path.join(__dirname, `../../public/${folder}`))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = String(Math.floor(Math.random() * 100000))
    cb(null, Date.now() + uniqueSuffix + path.extname(file.originalname))
  }
})

const uploadImage = multer({
  storage: imgStorage,
  fileFilter(req, file, cb) {
    const validTypes = /\.(png||jpg)$/

    if (!file.originalname.match(validTypes)) {
      return cb(new Error("Por favor, envie apenas arquivos .jpg e .png."))
    }

    cb(null, true)
  }
})

export default uploadImage;