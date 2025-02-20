import { useEffect, useState } from "react";
import axios from "axios";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/expenses");
    setExpenses(res.data);
  };

  return (
    <div>
      {expenses.map((exp) => (
        <div key={exp._id}>
          {exp.title} - ${exp.amount}
        </div>
      ))}
    </div>
  );
}
