import { Router } from "express";

import { alterUserPermissions, getUserList, loginAsUser, registerUser, removeUserAccount, updateUser } from "../controller/usuariosController.js"

const router = Router();

// Public Routes:
router.post("/registro", registerUser)
router.post("/login", loginAsUser)
router.put("/:id", updateUser)

// Limited Routes (Admin-only):
router.get("/", getUserList)
router.delete("/:id", removeUserAccount)
router.patch("/:id/papel", alterUserPermissions)

export default router;