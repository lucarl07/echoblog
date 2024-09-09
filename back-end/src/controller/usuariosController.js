// Model Source:
import Usuario from "../model/usuarioModel.js";

// Model Validations:
import registerUserSchema from "../validators/registerUserSchema.js";
import loginSchema from "../validators/loginSchema.js";

// Helpers:
import formatZodError from "../helpers/formatZodError.js";
import hashPassword from "../helpers/hashPassword.js";
import checkPassword from "../helpers/checkPassword.js";
import createUserToken from "../helpers/createUserToken.js";

export const registerUser = async (req, res) => {
  const bodyVal = registerUserSchema.safeParse(req.body)

  if (!bodyVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos do corpo da requisição são inválidos.",
      details: formatZodError(bodyVal.error),
    });
  }

  const { nome, email, senha, papel } = req.body

  try {
    const hashedSenha = hashPassword(senha, 10)

    const newUser = { 
      nome, email, 
      senha: hashedSenha, 
      papel
    }

    await Usuario.create(newUser)
    res.status(200).json({
      message: "Usuário cadastrado com sucesso!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro interno durante o registro do usuário."
    })
  }
}

export const loginAsUser = async (req, res) => {
  const bodyVal = loginSchema.safeParse(req.body)

  if (!bodyVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos do corpo da requisição são inválidos.",
      details: formatZodError(bodyVal.error),
    });
  }

  const { email, senha } = req.body

  try {
    const user = await Usuario.findOne({ where: {email} })

    if (!user) {
      return res.status(409).json({
        message: "O e-mail não existe."
      })
    }
    if (!checkPassword(senha, user.senha)) {
      return res.status(409).json({
        message: "A senha está incorreta."
      })
    }

    const token = createUserToken(user)

    res.status(200).json({
      message: "Usuário logado com sucesso!",
      id: user.usuario_id,
      token
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro interno durante o login do usuário."
    })
  }
}

export const updateUser = async (req, res) => {}

export const getUserList = async (req, res) => {}

export const removeUserAccount = async (req, res) => {}

export const alterUserPermissions = async (req, res) => {}
