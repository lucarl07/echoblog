// Dependencies:
import { Op } from "sequelize";

// Model Source:
import Usuario from "../model/usuarioModel.js";

// Model Validations:
import registerUserSchema from "../validators/registerUserSchema.js";
import loginSchema from "../validators/loginSchema.js";
import postIdSchema from "../validators/postIdSchema.js";
import updateUserSchema from "../validators/updateUserSchema.js";

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
    const imagem = req.file.path || null

    const newUser = { 
      nome, email, 
      senha: hashedSenha,
      imagem,
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
      return res.status(404).json({
        message: "Um usuário com esse e-mail não existe."
      })
    }
    if (!checkPassword(senha, user.senha)) {
      return res.status(401).json({
        message: "A senha para este usuário está incorreta."
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

export const updateUser = async (req, res) => {
  const paramsVal = postIdSchema.safeParse(req.params)

  if (!paramsVal.success) {
    return res.status(400).json({
      message: "O parâmetro ID recebido é inválido.",
      details: formatZodError(bodyVal.error),
    });
  }

  const bodyVal = updateUserSchema.safeParse(req.body)

  if (!bodyVal.success) {
    return res.status(400).json({
      message: "Os dados recebidos do corpo da requisição são inválidos.",
      details: formatZodError(bodyVal.error),
    });
  }

  const { id } = req.params
  const { nome, email, senha, papel } = req.body
  
  try {
    const user = await Usuario.findByPk(id)
    
    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      })
    }

    const usedEmail = await Usuario.findAll({ 
      where: {
        email,
        [Op.not]: { 
          usuario_id: id 
        }
      },
    })

    if (usedEmail.length > 0) {
      return res.status(409).json({
        message: "O e-mail inserido já está em uso."
      })
    }

    const updatedUser = { nome, email, papel }

    if (senha) {
      const hashedSenha = hashPassword(senha, 10)
      updatedUser['senha'] = hashedSenha
    }

    await Usuario.update(updatedUser, {
      where: { usuario_id: id }
    })
    res.status(200).json({
      message: "Usuário atualizado com sucesso!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro interno durante a alteração do usuário."
    })
  }
}

export const getUserList = async (req, res) => {
  const { nome, email, senha } = req.query

  try {
    const params = {}

    if (nome) {
      params["nome"] = `%${nome}%`
    }
    if (email) {
      params["email"] = `%${email}%`
    }
    if (senha) {
      params["senha"] = `%${senha}%`
    }
    
    const usuarios = await Usuario.findAll({ where: params })

    res.status(200).json(usuarios)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro interno durante a busca por usuários."
    })
  }
}

export const removeUserAccount = async (req, res) => {
  const paramsVal = postIdSchema.safeParse(req.params)

  if (!paramsVal.success) {
    return res.status(400).json({
      message: "O parâmetro ID recebido é inválido.",
      details: formatZodError(bodyVal.error),
    });
  }

  const usuario_id = req.params.id

  try { 
    await Usuario.destroy({ where: { usuario_id } })

    res.status(200).json({
      message: "Usuário removido com sucesso."
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro interno durante a busca por usuários."
    })
  }
}

export const alterUserPermissions = async (req, res) => {
  const paramsVal = postIdSchema.safeParse(req.params)

  if (!paramsVal.success) {
    return res.status(400).json({
      message: "O parâmetro ID recebido é inválido.",
      details: formatZodError(bodyVal.error),
    });
  }

  const usuario_id = req.params.id

  try { 
    const usuario = await Usuario.findByPk(usuario_id, { raw: true })
    let newRole = ""

    if (usuario.papel == 'leitor') {
      newRole = 'autor'
    } else if (usuario.papel == 'autor') {
      newRole = 'leitor'
    }

    await Usuario.update(
      { papel: newRole }, 
      { where: {usuario_id} }
    );

    res.status(200).json({
      message: "Papel do usuário modificado com sucesso.",
      newRole
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro interno durante a alteração de permissões."
    })
  }
}
