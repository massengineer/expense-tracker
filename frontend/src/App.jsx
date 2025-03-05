import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // For Vite (React)

function App() {
  // State for expenses
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/expenses`);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="App">
      <ExpenseForm fetchExpenses={fetchExpenses} setExpenses={setExpenses} />
      <div className="expense-content">
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
}

export default App;
