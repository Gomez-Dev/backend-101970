import CustomError from "./custom.error.js";
import { ERROR_DICTIONARY } from "./error.dictionary.js";

export class UserNotFoundError extends CustomError {
  constructor() {
    super(
      ERROR_DICTIONARY.USER_NOT_FOUND.message,
      "USER_NOT_FOUND",
      ERROR_DICTIONARY.USER_NOT_FOUND.statusCode,
    );
  }
}

export class ProductNotFoundError extends CustomError {
  constructor() {
    super(
      ERROR_DICTIONARY.PRODUCT_NOT_FOUND.message,
      "PRODUCT_NOT_FOUND",
      ERROR_DICTIONARY.PRODUCT_NOT_FOUND.statusCode,
    );
  }
}

export class InvalidIdError extends CustomError {
  constructor() {
    super(
      ERROR_DICTIONARY.INVALID_ID.message,
      "INVALID_ID",
      ERROR_DICTIONARY.INVALID_ID.statusCode,
    );
  }
}

export class InvalidMockQuantityError extends CustomError {
  constructor() {
    super(
      ERROR_DICTIONARY.INVALID_MOCK_QUANTITY.message,
      "INVALID_MOCK_QUANTITY",
      ERROR_DICTIONARY.INVALID_MOCK_QUANTITY.statusCode,
    );
  }
}

export class MockQuantityExceededError extends CustomError {
  constructor() {
    super(
      ERROR_DICTIONARY.MOCK_QUANTITY_EXCEEDED.message,
      "MOCK_QUANTITY_EXCEEDED",
      ERROR_DICTIONARY.MOCK_QUANTITY_EXCEEDED.statusCode,
    );
  }
}

export class DatabaseError extends CustomError {
  constructor() {
    super(
      ERROR_DICTIONARY.DATABASE_ERROR.message,
      "DATABASE_ERROR",
      ERROR_DICTIONARY.DATABASE_ERROR.statusCode,
    );
  }
}
