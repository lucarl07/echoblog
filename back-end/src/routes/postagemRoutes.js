import { Router } from "express";

import {} from "../controller/postagemController.js"

const router = Router();

router.post("/")
router.get("/")
router.get("/:id")
router.put("/:id")
router.delete("/:id")
router.post("/:id/imagem")

export default router;