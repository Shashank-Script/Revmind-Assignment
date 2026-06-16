import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import productRoutes from "./routes/productRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";
import trendRoutes from "./routes/trendRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import categoryRoutes from "./routes/categoryRevenueRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/trends", trendRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/category-revenue", categoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});