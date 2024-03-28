// index.js

import express from "express";
import authRoute from "./authRoutes.js";
import postRoute from "./postRoutes.js";
import userRoute from "./userRoutes.js";
import catRoute from './catRoutes.js';

const router = express.Router();

router.use(`/auth`, authRoute);
router.use(`/users`, userRoute);
router.use(`/posts`, postRoute);
router.use(`/categories`, catRoute); // Mount categoryRoute on /categories path

export default router;
