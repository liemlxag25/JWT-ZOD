import { Router } from "express";
import homeRouter from "./home.route";
import authRouter from "./auth.route";
import nhanvienRouter from "./nhanvien.route";

const router = Router();

router.use("/", homeRouter);
router.use("/", authRouter);
router.use("/nhanvien", nhanvienRouter);

export default router;
