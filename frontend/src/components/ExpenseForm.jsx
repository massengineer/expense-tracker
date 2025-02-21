import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function ExpenseForm({ fetchExpenses }) {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/expenses", expense);
    fetchExpenses();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-200 dark:bg-gray-800">
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setExpense({ ...expense, title: e.target.value })}
        className="p-2 mb-2 rounded-l-md"
      />
      <input
        type="number"
        placeholder="Amount"
        onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
        className="p-2 mb-2"
      />
      <input
        type="text"
        placeholder="Category"
        onChange={(e) => setExpense({ ...expense, category: e.target.value })}
        className="p-2 mb-2"
      />
      <button
        type="submit"
        className="p-2 bg-purple-600 text-white rounded-r-md"
      >
        Add Expense
      </button>
    </form>
  );
}

ExpenseForm.propTypes = {
  fetchExpenses: PropTypes.func.isRequired, // This ensures `fetchExpenses` is a function and required
};
