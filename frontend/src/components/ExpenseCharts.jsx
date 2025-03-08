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
  const COLORS = [
    "#4F46E5", // Blue
    "#22C55E", // Green
    "#EAB308", // Yellow
    "#EF4444", // Red
    "#06B6D4", // Teal
    "#F472B6", // Pink
    "#9333EA", // Purple
    "#F97316", // Orange
    "#10B981", // Emerald
    "#2563EB", // Sky Blue
  ];

  // Sort expenses by date to ensure chronological order on the Line Chart
  const sortedExpenses = expenses.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

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
          <LineChart
            data={sortedExpenses}
            margin={{ bottom: 20, right: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              label={{
                value: "Date of Expense",
                position: "insideBottom",
                offset: -15,
              }}
            />
            <YAxis
              label={{
                value: "Expense (£)",
                angle: -90,
                position: "insideLeft",
                dy: 50,
              }}
            />
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
  expenses: PropTypes.array.isRequired, // This ensures `expenses` is an array and required
};
