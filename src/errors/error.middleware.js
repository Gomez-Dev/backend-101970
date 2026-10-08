import CustomError from "./custom.error.js";
import { InvalidIdError } from "./domain.errors.js";
import { ERROR_DICTIONARY } from "./error.dictionary.js";

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      status: "error",
      code: error.code,
      message: error.message,
    });
  }

  if (error.name === "CastError") {
    const invalidIdError = new InvalidIdError();

    return res.status(invalidIdError.statusCode).json({
      status: "error",
      code: invalidIdError.code,
      message: invalidIdError.message,
    });
  }

  console.error(error);

  return res.status(ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.statusCode).json({
    status: "error",
    code: "INTERNAL_SERVER_ERROR",
    message: ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.message,
  });
};

export default errorMiddleware;
