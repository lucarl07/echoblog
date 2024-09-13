import { z } from "zod";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

const registerUserSchema = z.object({
  nome: z.string()
    .max(255, "O número de caracteres é maior que 255"),
  email: z.string()
    .email("O e-mail não está no formato adequado."),
  senha: z.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .regex(passwordRegex, "A senha deve conter letras maiúsculas, minúsculas e números."),
  imagem: z.optional(
    z.string()
  ),
  papel: z.optional(
    z.enum(["administrador", "autor", "leitor"])
  )
})

export default registerUserSchema;