import logger from "../config/logger.config.js";

class LoggerController {
  testLogger = (req, res) => {
    logger.debug("Prueba del logger: nivel debug");
    logger.http("Prueba del logger: nivel http");
    logger.info("Prueba del logger: nivel info");
    logger.warning("Prueba del logger: nivel warning");
    logger.error("Prueba del logger: nivel error");
    logger.fatal("Prueba del logger: nivel fatal");

    res.status(200).json({
      status: "success",
      message: "Prueba del logger ejecutada correctamente",
      levels: ["debug", "http", "info", "warning", "error", "fatal"],
    });
  };
}

export default LoggerController;
