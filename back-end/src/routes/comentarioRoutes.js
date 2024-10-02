// Dependencies:
import { Router } from "express";

// Helpers:
import verifyPosterToken from "../helpers/verifyPosterToken.js";

// Controllers:
import { deleteComment, editComment } from "../controller/comentarioController.js"

const router = Router();

router.put('/:id', editComment)
router.delete('/:id', deleteComment)

export default router;