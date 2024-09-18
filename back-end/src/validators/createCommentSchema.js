import { z } from "zod";

const createCommentSchema = z.object({
  conteudo: z.string()
    .min(5, "O número de caracteres deve ser maior ou igual a 5.")
    .max(2000, "O número de caracteres deve ser menor que 100.")
})

export default createCommentSchema;