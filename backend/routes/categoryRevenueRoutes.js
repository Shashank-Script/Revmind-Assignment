import express from "express";
import { getCategoryRevenue } from "../controllers/categoryRevenueController.js";

const router = express.Router();
router.get("/", getCategoryRevenue);

export default router;