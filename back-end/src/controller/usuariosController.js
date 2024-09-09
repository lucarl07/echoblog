// Model Source:
import Usuario from "../model/usuarioModel.js";

// Model Validations:
import registerUserSchema from "../validators/registerUserSchema.js";

// Helpers:
import formatZodError from "../helpers/formatZodError.js";

export const registerUser = async (req, res) => {
  const bodyVal = registerUserSchema.safeParse(req.body)

  if (!bodyVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos do corpo da requisição são inválidos.",
      details: formatZodError(bodyVal.error),
    });
  }

  const { nome, email, senha, papel } = req.body

  const newUser = { nome, email, senha, papel }

  try {
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

export const loginAsUser = async (req, res) => {}

export const updateUser = async (req, res) => {}

export const getUserList = async (req, res) => {}

export const removeUserAccount = async (req, res) => {}

export const alterUserPermissions = async (req, res) => {}
