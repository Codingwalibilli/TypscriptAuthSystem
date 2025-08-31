import { Router } from "express";
import { login } from "../controllers/login.js";
import { register } from "../controllers/register.js";
import { init } from "../controllers/init.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { logout } from "../controllers/logout.js";
import { refreshAccess } from "../controllers/refreshAccess.js";

const router = Router();

router.get("/",init);
router.post("/login", login);
router.post("/register", register);

router.post("/logout", verifyToken, logout);
router.post("/refreshAccess", refreshAccess);

export default router;