// Dependencies:
import { Router } from "express";

// Helpers:
import verifyPosterToken from "../helpers/verifyPosterToken.js";
import uploader from "../helpers/uploadImage.js";

// Controllers:
import {
  createPost,
  deletePost,
  getPostByID,
  showPostsByPage,
  updatePost,
  uploadImageToPost,
} from "../controller/postagemController.js";
import { 
  createComment, 
  listCommentsFromPost 
} from "../controller/comentarioController.js";

const router = Router();

router.post("/", verifyPosterToken, uploader.single("imagem"), createPost);
router.get("/", showPostsByPage);
router.get("/:id/comentarios", listCommentsFromPost);
router.get("/:id", getPostByID);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/comentarios", createComment);
router.post("/:id/imagem", uploader.single("imagem"), uploadImageToPost);

export default router;
