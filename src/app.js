import express from "express";
import productsRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

export default app;
