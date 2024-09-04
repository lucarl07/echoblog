// Model Source:
import Postagem from "../model/postagemModel.js";

// Model Validations:
import createPostSchema from "../validators/createPostSchema.js";

// Helpers:
import formatZodError from "../helpers/formatZodError.js";

export const createPost = async (req, res) => {
  const bodyVal = createPostSchema.safeParse(req.body);
  
  if (!bodyVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos do corpo da requisição são inválidos.",
      details: formatZodError(bodyVal.error),
    });
  }
  
  const { titulo, conteudo, autor, imagem } = req.body;

  const newPost = {
    titulo,
    conteudo,
    autor,
    imagem: imagem || ""
  }

  try {
    await Postagem.create(newPost);
    res.status(201).json({
      message: "Tarefa criada com sucesso!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro interno durante a criação da tarefa."
    })
  }
}