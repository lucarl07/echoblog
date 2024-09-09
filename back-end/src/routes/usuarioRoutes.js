import { Router } from "express";

import {} from "../controller/usuariosController.js"

const router = Router();

// Public Routes:
router.post("/registro")
router.post("/login")
router.put("/:id")

// Limited Routes (Admin-only):
router.get("/")
router.delete("/:id")
router.patch("/:id/papel")

export default router;