import { z } from "zod";

const createPostSchema = z.object({
  titulo: z.string()
    .min(5, "O número de caracteres deve ser maior ou igual a 5.")
    .max(100, "O número de caracteres deve ser menor que 100."),
  conteudo: z.string()
    .min(10, "O número de caracteres deve ser maior ou igual a 10.")
    .max(10000, "O número de caracteres deve ser menor que 10000 (10 mil)."),
  autor: z.string()
    .min(5, "O número de caracteres deve ser maior ou igual a 5.")
    .max(100, "O número de caracteres deve ser menor que 100."),
  imagem: z.optional(
    z.string()
  ),
})

export default createPostSchema;