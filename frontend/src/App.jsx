import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseCharts";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  // State for expenses
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:5000/expenses");
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="App">
      <ThemeToggle />
      <ExpenseForm fetchExpenses={fetchExpenses} />
      <div className="expense-content">
        <ExpenseList expenses={expenses} />
        <ExpenseChart expenses={expenses} />
      </div>
    </div>
  );
}

export default App;
