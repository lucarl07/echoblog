import { Router } from "express";

import uploader from "../helpers/uploadImage.js";

import { 
  createPost, 
  deletePost, 
  getPostByID, 
  showPostsByPage, 
  updatePost
} from "../controller/postagemController.js"

const router = Router();

router.post("/", createPost)
router.get("/", showPostsByPage)
router.get("/:id", getPostByID)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)
router.post("/:id/imagem", uploader.single("imagem"))

export default router;