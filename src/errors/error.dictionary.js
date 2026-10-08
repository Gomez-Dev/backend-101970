export const ERROR_DICTIONARY = Object.freeze({
  USER_NOT_FOUND: {
    message: "Usuario no encontrado",
    statusCode: 404,
  },

  PRODUCT_NOT_FOUND: {
    message: "Producto no encontrado",
    statusCode: 404,
  },

  INVALID_ID: {
    message: "El ID proporcionado no es válido",
    statusCode: 400,
  },

  INVALID_MOCK_QUANTITY: {
    message: "La cantidad de mocks debe ser un número entero mayor que 0",
    statusCode: 400,
  },

  MOCK_QUANTITY_EXCEEDED: {
    message: "La cantidad de mocks supera el máximo permitido",
    statusCode: 400,
  },

  DATABASE_ERROR: {
    message: "Error al procesar los datos en la base de datos",
    statusCode: 500,
  },

  INTERNAL_SERVER_ERROR: {
    message: "Error interno del servidor",
    statusCode: 500,
  },
});
