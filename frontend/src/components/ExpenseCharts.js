import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import PropTypes from "prop-types";

export default function ExpenseCharts({ expenses }) {
  // Generate category-wise breakdown for Pie Chart
  const categoryData = expenses.reduce((acc, expense) => {
    const found = acc.find((item) => item.name === expense.category);
    if (found) {
      found.value += Number(expense.amount);
    } else {
      acc.push({ name: expense.category, value: Number(expense.amount) });
    }
    return acc;
  }, []);

  // Colors for Pie Chart
  const COLORS = ["#4F46E5", "#22C55E", "#EAB308", "#EF4444", "#06B6D4"];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg">
      {/* Pie Chart for Category Breakdown */}
      <div className="w-full md:w-1/2">
        <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">
          Expense Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart for Expense Trends */}
      <div className="w-full md:w-1/2">
        <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">
          Expense Trends
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={expenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

ExpenseCharts.propTypes = {
  expenses: PropTypes.func.isRequired, // This ensures `expenses` is a function and required
};
