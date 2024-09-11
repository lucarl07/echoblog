import { z } from "zod";

const loginSchema = z.object({
  email: z.string(),
  senha: z.string()
})

export default loginSchema;