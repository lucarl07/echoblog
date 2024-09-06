import { Router } from "express";

import { createPost, getPostByID, showPostsByPage } from "../controller/postagemController.js"

const router = Router();

router.post("/", createPost)
router.get("/", showPostsByPage)
router.get("/:id", getPostByID)
router.put("/:id")
router.delete("/:id")
router.post("/:id/imagem")

export default router;