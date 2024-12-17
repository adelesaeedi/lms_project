import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // مسیر ثبت‌نام
router.post("/login", login); // مسیر ورود (اختیاری)

export default router;
