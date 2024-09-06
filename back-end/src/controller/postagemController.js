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

export const showPostsByPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const postagens = await Postagem.findAndCountAll({
      limit,
      offset,
    });
    const totalPaginas = Math.ceil(postagens.count / limit);

    res.status(200).json({
      totalPostagens: postagens.count,
      totalPaginas,
      paginaAtual: page,
      itemsPorPagina: limit,
      proximaPagina: totalPaginas === 0
        ? null
        : `${process.env.BASE_URL}/postagens?page=${page + 1}&limit=${limit}`,
      postagens: postagens.rows
    });
  } catch (error) {
    res.status(500).json({
      err: "Erro interno ao buscar postagens.",
    });
  }
};