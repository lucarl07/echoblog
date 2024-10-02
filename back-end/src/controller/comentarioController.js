// Source model:
import Comentario from "../model/comentarioModel.js";
import Postagem from "../model/postagemModel.js";

// Validators:
import postIdSchema from "../validators/postIdSchema.js";
import createCommentSchema from "../validators/createCommentSchema.js";

// Helpers:
import formatZodError from "../helpers/formatZodError.js";
import findTokenBearer from "../helpers/findTokenBearer.js";

export const createComment = async (req, res) => {
  const paramsVal = postIdSchema.safeParse(req.params);

  if (!paramsVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos da URL da requisição são inválidos.",
      details: formatZodError(paramsVal.error),
    });
  }
  
  const bodyVal = createCommentSchema.safeParse(req.body);

  if (!bodyVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos do corpo da requisição são inválidos.",
      details: formatZodError(bodyVal.error),
    });
  }

  const tokenBearer = findTokenBearer(req)

  if (typeof tokenBearer !== 'object') {
    return res.status(401).json({
      message: "A ação não pôde ser realizada."
    })
  }

  const postagem_id = req.params.id
  const usuario_id = tokenBearer.id
  const { conteudo } = req.body

  try {
    const newComment = {
      conteudo, 
      usuario_id,
      postagem_id
    }

    await Comentario.create(newComment)

    res.status(201).json({
      message: "Comentário enviado por sucesso!"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Erro interno durante a atualização da postagem."
    })
  }
}

export const editComment = async (req, res) => {
  const paramsVal = postIdSchema.safeParse(req.params);

  if (!paramsVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos da URL da requisição são inválidos.",
      details: formatZodError(paramsVal.error),
    });
  }

  const bodyVal = createCommentSchema.safeParse(req.body);

  if (!bodyVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos do corpo da requisição são inválidos.",
      details: formatZodError(bodyVal.error),
    });
  }

  const comentario_id = req.params.id
  const { conteudo } = req.body

  try {
    const comentario = await Comentario.findByPk(comentario_id)
    const tokenBearer = findTokenBearer(req)

    if (
      typeof tokenBearer !== 'object' || 
      tokenBearer.id !== comentario.usuario_id
    ) {
      return res.status(401).json({
        message: "Não foi possível concluir a ação."
      })
    }

    await comentario.update({ conteudo })

    res.status(200).json({
      message: "Comentário atualizado com sucesso.",
      changes: { conteudo }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Erro interno durante a atualização do comentário."
    })
  }
}

export const deleteComment = async (req, res) => {
  const paramsVal = postIdSchema.safeParse(req.params);

  if (!paramsVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos da URL da requisição são inválidos.",
      details: formatZodError(paramsVal.error),
    });
  }

  const comentario_id = req.params.id

  try {
    const comentario = await Comentario.findByPk(comentario_id)
    const tokenBearer = findTokenBearer(req)

    if (
      typeof tokenBearer !== 'object' || 
      tokenBearer.id !== comentario.usuario_id
    ) {
      return res.status(401).json({
        message: "Não foi possível concluir a ação."
      })
    }

    await comentario.destroy();

    res.status(200).json({
      message: "Comentário removido no sucesso."
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Erro interno durante a atualização do comentário."
    })
  }
}

export const listCommentsFromPost = async (req, res) => {
  const paramsVal = postIdSchema.safeParse(req.params);

  if (!paramsVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos da URL da requisição são inválidos.",
      details: formatZodError(paramsVal.error),
    });
  }

  const postagem_id = req.params.id;

  try {
    const comentarios = await Comentario.findAll({ where: { postagem_id } })

    res.status(200).json({
      amount: comentarios.length,
      comments: comentarios
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Erro interno durante a visualização dos comentários"
    })
  }
}