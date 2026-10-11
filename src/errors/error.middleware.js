import CustomError from "./custom.error.js";
import { InvalidIdError } from "./domain.errors.js";
import { ERROR_DICTIONARY } from "./error.dictionary.js";
import logger from "../config/logger.config.js";

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof CustomError) {
    if (error.statusCode >= 500) {
      logger.error(
        `${error.code}: ${error.message} - ${req.method} ${req.originalUrl}`,
      );
    } else {
      logger.warning(
        `${error.code}: ${error.message} - ${req.method} ${req.originalUrl}`,
      );
    }

    return res.status(error.statusCode).json({
      status: "error",
      code: error.code,
      message: error.message,
    });
  }

  if (error.name === "CastError") {
    const invalidIdError = new InvalidIdError();

    logger.warning(`${invalidIdError.code}: ${req.method} ${req.originalUrl}`);

    return res.status(invalidIdError.statusCode).json({
      status: "error",
      code: invalidIdError.code,
      message: invalidIdError.message,
    });
  }

  logger.error(`${error.message} - ${req.method} ${req.originalUrl}`, {
    stack: error.stack,
  });

  return res.status(ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.statusCode).json({
    status: "error",
    code: "INTERNAL_SERVER_ERROR",
    message: ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.message,
  });
};

export default errorMiddleware;
