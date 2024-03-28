import express from "express";
import {
  OPTVerification,
  getWriter,
  resendOTP,
  updateUser,
} from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/verify/:userId/:otp", OPTVerification);
router.post("/resend-link/:id", resendOTP);

// user routes
router.put("/update-user", userAuth, updateUser);

router.get("/get-user/:id?", getWriter);

export default router;
