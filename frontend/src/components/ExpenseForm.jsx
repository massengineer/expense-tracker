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
      {/* TODO:
      <input 
        type="date"
        placeholder="Date"
        onChange={(e) => setExpense({ ...expense, date: e.target.value })}  
        className="p-2 mb-2" 
      /> This is a preliminary input field but will most likely chamge and not 
      be like this as I want the date to have a calendar date picker and the category 
      to have a dropdown menu with the option of selecting other and then adding custom category*/} 
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
