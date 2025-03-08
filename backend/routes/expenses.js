import express from "express";
import Expense from "../models/Expense.js";
const router = express.Router();

// POST route for creating an expense
router.post("/", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    console.log("Created expense:", expense);
    res.json(expense);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Fetch all expenses and format the date
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    const formattedExpenses = expenses.map((expense) => ({
      ...expense.toObject(),
      date: expense.date.toISOString().split("T")[0], // Format the date
    }));
    res.json(formattedExpenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).send("Server Error");
  }
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
