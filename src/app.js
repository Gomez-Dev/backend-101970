import express from "express";
import productsRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";
import mockRouter from "./routes/mocks.js";

const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/mocks", mockRouter);

export default app;
