import jwt from "jsonwebtoken"

const findTokenBearer = (request) => {
  let auth = request.headers.authorization
  
  try {
    let token = auth.split(" ")[1]
    const tokenBearer = jwt.verify(token, process.env.USER_TOKEN_SECRET)
    return tokenBearer;
  } catch (error) {
    return new Error(`Token inexistente (${error})`)
  }
}

export default findTokenBearer;