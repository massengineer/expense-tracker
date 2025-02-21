import mongoose from "mongoose";

// Define schema for an expense
const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// Create model from the schema
const Expense = mongoose.model("Expense", expenseSchema);

// Export the model for use in routes
export default Expense;
