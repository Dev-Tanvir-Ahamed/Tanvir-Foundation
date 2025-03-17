import express from "express";
import { createDonationController } from "../controllers/donationContoller";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create", authenticate, createDonationController);

export default router;
