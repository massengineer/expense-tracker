// Import modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import expensesRoutes from "./routes/expenses.js";

// Middleware routes
app.use("/expenses", expensesRoutes);

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB Connected"));

app.listen(5000, () => console.log("Server running on port 5000"));
