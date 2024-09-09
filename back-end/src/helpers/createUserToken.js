import jwt from "jsonwebtoken";

const createUserToken = (user) => {
  const token = jwt.sign(
    {
      nome: user.nome,
      id: user.usuario_id,
      permissoes: user.papel
    }, 
    process.env.USER_TOKEN_SECRET
  )

  return token;
}

export default createUserToken;