class CustomError extends Error {
  constructor(message, code, statusCode = 500) {
    super(message);

    this.name = "CustomError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

export default CustomError;
