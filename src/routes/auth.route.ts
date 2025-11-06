import { Router } from "express";
import { getLogin, getRegister, postLogin, postRegister, logout } from "../controllers/auth.controller";
import { validateLogin, validateRegister } from "../middlewares/auth.middleware";

const router = Router();

router.get("/login", getLogin);
router.post("/login", validateLogin, postLogin);   
router.get("/register", getRegister);
router.post("/register", validateRegister, postRegister); 
router.get("/logout", logout);

export default router;
