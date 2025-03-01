import { useState } from "react";
import { Datepicker } from "flowbite-react";
import axios from "axios";
import PropTypes from "prop-types";

export default function ExpenseForm({ fetchExpenses }) {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "", // Store the selected date as a string
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedExpense = {
        ...expense,
        date: new Date(expense.date).toISOString(), // Ensure correct format
      };

      await axios.post("http://localhost:5000/expenses", formattedExpense);
      fetchExpenses(); // Refresh expenses after adding
      setExpense({ title: "", amount: "", category: "", date: "" }); // Reset form
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-200 dark:bg-gray-800">
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setExpense({ ...expense, title: e.target.value })}
        className="p-2 mb-2 rounded-l-md"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
        className="p-2 mb-2"
        required
      />
      <input
        type="text"
        placeholder="Category"
        onChange={(e) => setExpense({ ...expense, category: e.target.value })}
        className="p-2 mb-2 rounded-r-md"
        required
      />
      {/* Datepicker */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Date
      </label>
      <Datepicker
        value={expense.date}
        onChange={(date) =>
          setExpense({ ...expense, date: date.toISOString().split("T")[0] })
        } // Convert to YYYY-MM-DD
        className="w-full border border-gray-300 dark:text-gray-200 rounded-lg px-3 py-2"
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
      <button type="submit" className="p-2 bg-purple-600 text-white rounded-md">
        Add Expense
      </button>
    </form>
  );
}

ExpenseForm.propTypes = {
  fetchExpenses: PropTypes.func.isRequired, // This ensures `fetchExpenses` is a function and required
};
