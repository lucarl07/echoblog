import { Router } from "express";

import { alterUserPermissions, getUserList, loginAsUser, registerUser, removeUserAccount, updateUser } from "../controller/usuariosController.js"
import verifyAdminToken from "../helpers/verifyAdminToken.js";
import verifyUserToken from "../helpers/verifyUserToken.js";
import uploadImage from "../helpers/uploadImage.js";

const router = Router();

// Public Routes:
router.post("/registro", uploadImage.single("imagem"), registerUser)
router.post("/login", loginAsUser)
router.put("/:id", verifyUserToken, uploadImage.single("imagem"), updateUser)

// Limited Routes (Admin-only):
router.get("/", verifyAdminToken, getUserList)
router.delete("/:id", verifyAdminToken, removeUserAccount)
router.patch("/:id/papel", verifyAdminToken, alterUserPermissions)

export default router;