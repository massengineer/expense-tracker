import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ThemeToggle from "./components/ThemeToggle";
import axios from "axios";

function App() {
  // State for expenses
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/expenses");
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
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <ExpenseForm fetchExpenses={fetchExpenses} setExpenses={setExpenses} />
      <div className="expense-content">
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
}

export default App;
