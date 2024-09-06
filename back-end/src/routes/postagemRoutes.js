import { Router } from "express";

import { createPost, showPostsByPage } from "../controller/postagemController.js"

const router = Router();

router.post("/", createPost)
router.get("/", showPostsByPage)
router.get("/:id")
router.put("/:id")
router.delete("/:id")
router.post("/:id/imagem")

export default router;