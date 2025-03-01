import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseCharts from "./ExpenseCharts";
import PropTypes from "prop-types";

export default function ExpenseList({ expenses }) {
  const [setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  });

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Display Pie Chart and Line Chart Side by Side */}
      <ExpenseCharts expenses={expenses} />

      {/* Display Expenses Below */}
      <div className="mt-6">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow-md mb-2"
          >
            <h3 className="text-blue-500 dark:text-gray-100">
              {expense.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              £{expense.amount}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {expense.category}
            </p>
            {/* <p className="text-gray-500 dark:text-gray-400">{expense.date}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

ExpenseList.propTypes = {
  expenses: PropTypes.array.isRequired,
};
