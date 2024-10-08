import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

const updateUserSchema = z.object({
  nome: z.optional(
    z.string()
    .max(255, "O número de caracteres é maior que 255")
  ),
  email: z.optional(
    z.string()
    .regex(emailRegex, "O e-mail não está no formato adequado.")
  ),
  senha: z.optional(
    z.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .regex(passwordRegex, "A senha deve conter letras maiúsculas, minúsculas e números.")
  ),
  imagem: z.optional(
    z.string()
  )
})

export default updateUserSchema;