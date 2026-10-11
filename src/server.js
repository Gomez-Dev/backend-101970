import app from "./app.js";
import { config } from "./config/env.config.js";
import { connectDB } from "./config/database.config.js";
import logger from "./config/logger.config.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      logger.info(`Servidor ShipNow escuchando en el puerto ${config.port}`);
    });
  } catch (error) {
    logger.fatal(`Error crítico al iniciar el servidor: ${error.message}`);

    process.exit(1);
  }
};

startServer();
