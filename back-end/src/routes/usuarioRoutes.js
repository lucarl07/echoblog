import { Router } from "express";

import { alterUserPermissions, getUserList, loginAsUser, registerUser, removeUserAccount, updateUser } from "../controller/usuariosController.js"
import verifyAdminToken from "../helpers/verifyAdminToken.js";
import verifyUserToken from "../helpers/verifyUserToken.js";

const router = Router();

// Public Routes:
router.post("/registro", registerUser)
router.post("/login", loginAsUser)
router.put("/:id", verifyUserToken, updateUser)

// Limited Routes (Admin-only):
router.get("/", verifyAdminToken, getUserList)
router.delete("/:id", removeUserAccount)
router.patch("/:id/papel", alterUserPermissions)

export default router;