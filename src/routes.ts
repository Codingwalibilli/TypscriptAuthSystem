import { Router } from "express";
import { login } from "./controllers/login.js";
import { register } from "./controllers/register.js";
import { init } from "./controllers/init.js";

const router = Router();

router.get("/",init)
router.post("/login", login);
router.post("/register", register);

export default router;