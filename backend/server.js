import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import productRoutes from "./routes/productRoutes.js";
// import summaryRoutes from "./routes/summaryRoutes.js";
// import trendRoutes from "./routes/trendRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/products", productRoutes);
// app.use("/api/summary", summaryRoutes);
// app.use("/api/trends", trendRoutes);
// app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});