import express from "express";
import { createCategory, getCategories } from "../controllers/catController.js";


const router = express.Router();

// CREATE CATEGORY ROUTE
router.post("/create-category", createCategory);
router.get('/', getCategories);
export default router;
