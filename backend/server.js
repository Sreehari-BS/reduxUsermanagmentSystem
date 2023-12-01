import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddlewae.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users/", userRoutes);

app.use("/api/admin/", adminRoutes);

app.use(cors({
  origin:"http://localhost:3000"
}))

app.get("/", (req, res) => {
  res.send("Server is Ready");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Listening on http://localhost:${port}`);
});
