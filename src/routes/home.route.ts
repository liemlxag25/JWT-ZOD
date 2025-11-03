import { Router } from "express";
import { getHome } from "../controllers/home.controller";
import { checkLogin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", checkLogin, getHome);

export default router;
