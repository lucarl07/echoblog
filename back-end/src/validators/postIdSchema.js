import { z } from "zod";

const postIdSchema = z.object({
  id: z.string().uuid({
    message: "O formato do identificador não é UUID.",
  }),
});

export default postIdSchema;