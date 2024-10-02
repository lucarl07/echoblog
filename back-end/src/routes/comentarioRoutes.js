// Dependencies:
import { Router } from "express";

// Helpers:
import verifyPosterToken from "../helpers/verifyPosterToken.js";

// Controllers:
import { editComment } from "../controller/comentarioController.js"

const router = Router();

router.put('/:id', editComment)

export default router;