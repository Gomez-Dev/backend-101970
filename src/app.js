import express from "express";
import swaggerUi from "swagger-ui-express";

import productsRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";
import mockRouter from "./routes/mocks.js";
import loggerRouter from "./routes/logger.js";
import ordersRouter from "./routes/orders.js";
import deliveriesRouter from "./routes/deliveries.js";

import errorMiddleware from "./errors/error.middleware.js";
import swaggerSpec from "./config/swagger.config.js";

const app = express();

app.use(express.json());

// Documentación Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/mocks", mockRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/deliveries", deliveriesRouter);
app.use("/loggerTest", loggerRouter);

// Middleware para rutas inexistentes
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    code: "ROUTE_NOT_FOUND",
    message: "Ruta no encontrada",
  });
});

// Middleware global de errores: siempre al final
app.use(errorMiddleware);

export default app;
