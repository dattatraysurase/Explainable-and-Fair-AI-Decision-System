import express from "express";

import {
  predictLoan,
  getPredictions,
  getPredictionById
} from "../controllers/predictionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/predict", protect, predictLoan);

router.get("/", protect, getPredictions);

router.get("/:id", protect, getPredictionById);

export default router;