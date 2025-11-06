import { Router } from "express";
import {
  listNhanVien,
  getAddNhanVien,
  postAddNhanVien,
  getEditNhanVien,
  postEditNhanVien,
  deleteNhanVienById,
} from "../controllers/nhanvien.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validateNhanVienCreate, validateNhanVienUpdate } from "../middlewares/nhanvien.middleware";

const router = Router();

router.get("/", requireAuth, listNhanVien);
router.get("/add", requireAuth, getAddNhanVien);
router.post("/add", requireAuth, validateNhanVienCreate, postAddNhanVien);   
router.get("/edit/:id", requireAuth, getEditNhanVien);
router.post("/edit/:id", requireAuth, validateNhanVienUpdate, postEditNhanVien); 
router.get("/delete/:id", requireAuth, deleteNhanVienById);

export default router;
