import express from "express";
import Expense from "../models/Expense.js";
const router = express.Router();

// POST route for creating an expense
router.post("/", async (req, res) => {
  console.log("Received POST request with body:", req.body); // Add this log
  try {
    const expense = await Expense.create(req.body);
    console.log("Created expense:", expense); // Add this log
    res.json(expense);
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

router.put("/:id", async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// ✅ Delete ALL Expenses
router.delete("/", async (req, res) => {
  try {
    await Expense.deleteMany({});
    res.status(200).json({ message: "All expenses deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expenses", error });
  }
});

export default router;
