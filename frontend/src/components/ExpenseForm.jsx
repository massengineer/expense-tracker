import { useState } from "react";
import { Datepicker } from "flowbite-react";
import axios from "axios";
import PropTypes from "prop-types";

export default function ExpenseForm({ setExpenses, fetchExpenses }) {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: null, // Store the selected date as a string
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/expenses",
        expense
      );
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      setExpense({ title: "", amount: "", category: "", date: null });
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete("http://localhost:5000/expenses");
      setExpenses([]); // Clear UI immediately
    } catch (error) {
      console.error("Error deleting expenses:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-200 dark:bg-gray-800">
      <input
        type="text"
        placeholder="Title"
        value={expense.title}
        onChange={(e) => setExpense({ ...expense, title: e.target.value })}
        className="p-2 mb-2 rounded-l-md"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={expense.amount}
        onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
        className="p-2 mb-2"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={expense.category}
        onChange={(e) => setExpense({ ...expense, category: e.target.value })}
        className="p-2 mb-2 rounded-r-md"
        required
      />
      {/* Datepicker */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Date
      </label>
      <Datepicker
        value={expense.date ? new Date(expense.date) : null} // Pass a valid Date object or null
        onChange={(date) => setExpense({ ...expense, date: date })}
        className="w-full border border-gray-300 dark:text-gray-200 rounded-lg px-3 py-2"
      />
      {/* TODO:
      -category to have a dropdown menu with the option of selecting other and then adding custom category
      -add expense and delete all buttons need to be dynamic and stretch with screen without overlapping each other*/}
      {/* Add Expense Button */}
      <div className="absolute top-4 left-2/3 -translate-x-1/3">
        <button
          type="submit"
          className="p-2 bg-purple-600 text-white rounded-md"
        >
          Add Expense
        </button>
      </div>

      {/* Delete All Button */}
      <div className="absolute top-4 right-60">
        <button
          type="button"
          onClick={handleDeleteAll}
          className="p-2 bg-red-500 text-white rounded-md"
        >
          Delete All
        </button>
      </div>
    </form>
  );
}

ExpenseForm.propTypes = {
  setExpenses: PropTypes.func.isRequired,
  fetchExpenses: PropTypes.func.isRequired,
};
