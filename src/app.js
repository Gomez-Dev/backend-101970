import express from "express";
import productsRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";
import mockRouter from "./routes/mocks.js";
import errorMiddleware from "./errors/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/mocks", mockRouter);

app.use(errorMiddleware);

export default app;
