import { useState } from "react";
import { Datepicker } from "flowbite-react";
import axios from "axios";
import PropTypes from "prop-types";
import ThemeToggle from "./ThemeToggle";

export default function ExpenseForm({ setExpenses, fetchExpenses }) {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "Select Category", // Default category placeholder
    date: null, // Store the selected date as a string
  });

  const [isDropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state

  const categories = [
    "Food",
    "Tech",
    "Luxuries",
    "Education",
    "Social",
    "Business",
    "Groceries",
    "Car",
    "Bills",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/expenses",
        expense
      );
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      setExpense({
        title: "",
        amount: "",
        category: "Select Category",
        date: null,
      });
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
    <form
      onSubmit={handleSubmit}
      className="relative p-4 bg-gray-200 dark:bg-gray-800"
    >
      <div className="flex flex-wrap w-full gap-4 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={expense.title}
          onChange={(e) => setExpense({ ...expense, title: e.target.value })}
          className="p-2 border border-gray-300 rounded-md w-full sm:w-1/4"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          className="p-2 border border-gray-300 rounded-md w-full sm:w-1/4"
          required
        />

        {/* Category Dropdown */}
        <div
          className="relative w-full sm:w-1/4"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md px-5 py-2.5 w-full text-center inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            {expense.category}
            <svg
              className="w-2.5 h-2.5 ml-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute left-0 z-10 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-full dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setExpense({ ...expense, category });
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="w-full sm:w-1/4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Date*
          </label>
          <Datepicker
            value={expense.date ? new Date(expense.date) : null}
            onChange={(date) => setExpense({ ...expense, date: date })}
            className="w-full sm:w-64 border border-gray-300 dark:text-gray-200 rounded-lg px-3 py-3"
            style={{ zIndex: 1000 }} // Ensure the date picker popup stays on top
          />
        </div>
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded-md w-1/3 left-2/3 translate-x-1/3"
        >
          Add Expense
        </button>
        <button
          type="button"
          onClick={handleDeleteAll}
          className="p-2 bg-red-500 text-white rounded-md w-1/3 left-2/3 -translate-x-1/3"
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
