// Source Model:
import Curtida from "../model/curtidaModel.js";

// Helpers:
import findTokenBearer from "../helpers/findTokenBearer.js";

export const alterLike = async (request, response) => {
  const tokenBearer = findTokenBearer(request)
  
  if (tokenBearer instanceof Error) {
    return response.status(401).json({
      message: "Você precisa de uma conta para realizar a ação."
    })
  }
  
  const { postagem_id } = request.params

  try {
    const [like, isLikeNew] = await Curtida.findOrCreate({
      where: {
        usuario_id: tokenBearer.id,
        postagem_id
      }
    })

    if (!isLikeNew) {
      await Curtida.destroy({ where: { curtida_id: like.curtida_id }});
      return response.status(200).json({
        message: "Curtida removida da postagem.",
        isLiked: false
      })
    }

    return response.status(201).json({
      message: "A postagem foi curtida com sucesso!",
      isLiked: true
    })
  } catch (error) {
    console.error(error)
    return response.status(500).json({
      error: "Erro interno ao efetuar a curtida na postagem"
    })
  }
}