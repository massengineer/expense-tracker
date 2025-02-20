import { PieChart, Pie, Cell } from "recharts";
import PropTypes from "prop-types";

export default function ExpensePieChart({ expenses }) {
  const data = expenses.map((exp) => ({
    name: exp.category,
    value: exp.amount,
  }));
  const colors = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
      >
        {data.map((_, i) => (
          <Cell key={i} fill={colors[i % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

ExpensePieChart.propTypes = {
  expenses: PropTypes.func.isRequired, // This ensures `expenses` is a function and required
};
