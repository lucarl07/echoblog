// Model Source:
import Postagem from "../model/postagemModel.js";

// Model Validations:
import createPostSchema from "../validators/createPostSchema.js";
import updatePostSchema from "../validators/updatePostSchema.js";
import postIdSchema from "../validators/postIdSchema.js";

// Helpers:
import formatZodError from "../helpers/formatZodError.js";
import findTokenBearer from "../helpers/findTokenBearer.js";

export const createPost = async (req, res) => {
  const bodyVal = createPostSchema.safeParse(req.body);
  
  if (!bodyVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos do corpo da requisição são inválidos.",
      details: formatZodError(bodyVal.error),
    });
  }
  
  const { titulo, conteudo } = req.body;
  let imagem = ""

  if (req.file) {
    imagem = req.file.filename
  } else {
    imagem = ""
  }

  try {
    const tokenBearer = findTokenBearer(req)

    const newPost = { 
      titulo, conteudo, 
      autor_id: tokenBearer.id,
      imagem 
    }

    await Postagem.create(newPost);
    res.status(201).json({
      message: "Postagem publicada com sucesso!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro interno durante o envio da postagem."
    })
  }
}

export const showPostsByPage = async (req, res) => {
  const autor_id = req.query.autor || ""
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const queryCondition = {}

    if (autor_id) {
      queryCondition["autor_id"] = autor_id
    }

    const postagens = await Postagem.findAndCountAll({
      where: queryCondition,
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
    console.log(error)
    res.status(500).json({
      err: "Erro interno ao buscar postagens.",
    });
  }
};

export const getPostByID = async (req, res) => {
  const paramsVal = postIdSchema.safeParse(req.params);

  if (!paramsVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos da URL da requisição são inválidos.",
      details: formatZodError(paramsVal.error),
    });
  }

  const postagemId = req.params.id;

  try {
    const postagem = await Postagem.findByPk(postagemId);

    if (!postagem) {
      return res.status(404).json({
        message: "Postagem não encontrada.",
      });
    }

    res.status(200).json(postagem);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      err: "Erro interno ao buscar a postagem.",
    });
  }
};

export const updatePost = async (req, res) => {
  const paramsVal = postIdSchema.safeParse(req.params);

  if (!paramsVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos da URL da requisição são inválidos.",
      details: formatZodError(paramsVal.error),
    });
  }

  const bodyVal = updatePostSchema.safeParse(req.body);
  
  if (!bodyVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos do corpo da requisição são inválidos.",
      details: formatZodError(bodyVal.error),
    });
  }

  const { id } = req.params;
  const { titulo, conteudo, imagem } = req.body

  const postagemAtualizada = {
    titulo, conteudo, imagem
  }

  try {
    const postagem = await Postagem.findByPk(id)
    
    if (!postagem) {
      return res.status(404).json({
        message: "Postagem não encontrada."
      })
    }

    await Postagem.update(postagemAtualizada, { 
      where: { postagem_id: id } 
    })
    res.status(200).json({
      message: "Postagem atualizada com sucesso!"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Erro interno durante a atualização da postagem."
    })
  }
}

export const deletePost = async (req, res) => {
  const paramsVal = postIdSchema.safeParse(req.params);

  if (!paramsVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos da URL da requisição são inválidos.",
      details: formatZodError(paramsVal.error),
    });
  }

  const postagem_id = req.params.id;

  try {
    const postagem = await Postagem.findByPk(postagem_id)
    
    if (!postagem) {
      return res.status(404).json({
        message: "Postagem não encontrada."
      })
    }

    await Postagem.destroy({
      where: { postagem_id }
    })
    res.status(200).json({
      message: "Postagem removida com sucesso."
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      err: "Erro interno ao remover a postagem.",
    });
  }
}

export const uploadImageToPost = async (req, res) => {
  const paramsVal = postIdSchema.safeParse(req.params);

  if (!paramsVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos da URL da requisição são inválidos.",
      details: formatZodError(paramsVal.error),
    });
  }

  const postagem_id = req.params.id
  const imagem = req.file.filename

  try {    
    const post = await Postagem.findByPk(postagem_id)

    if (!post) {
      return res.status(404).json({
        message: "A postagem não foi encontrada."
      })
    }
    if (!req.file) {
      return res.status(400).json({
        message: "A imagem não foi encontrada."
      })
    }

    await Postagem.update({ imagem }, { where: { postagem_id } })

    res.status(201).json({
      message: "Imagem enviada e atribuída com sucesso."
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Erro ao enviar imagem."
    })
  }
}