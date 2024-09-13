import jwt from "jsonwebtoken";

const verifyPosterToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      err: "Acesso negado ao sistema."
    })
  }
  
  const token = req.headers.authorization.split(" ")[1]
  
  if (!token) {
    return res.status(401).json({
      err: "Acesso negado ao sistema."
    })
  }

  try {
    const tokenBearer = jwt.verify(token, process.env.USER_TOKEN_SECRET)
    
    if (tokenBearer.permissoes == "administrador" || tokenBearer.permissoes == "autor" ) {
      next()
    } else {
      res.status(401).json({
        message: "O usuário não possui permissão para realizar a ação.",
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "O token fornecido é inválido.",
      err: error
    })
  }
}

export default verifyPosterToken;