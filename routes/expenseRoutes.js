import express from "express";
import { addExpense, getExpense } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/addExpense", addExpense); // Endpoint to add a new expense
router.get("/getExpense/:tripId", getExpense);// Endpoint to add a new expense

export default router;
