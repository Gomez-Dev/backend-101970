export const ERROR_DICTIONARY = Object.freeze({
  USER_NOT_FOUND: {
    message: "Usuario no encontrado",
    statusCode: 404,
  },

  PRODUCT_NOT_FOUND: {
    message: "Producto no encontrado",
    statusCode: 404,
  },

  ORDER_NOT_FOUND: {
    message: "Pedido no encontrado",
    statusCode: 404,
  },

  DELIVERY_NOT_FOUND: {
    message: "Entrega no encontrada",
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

  FILE_REQUIRED: {
    message: "Debes adjuntar un archivo",
    statusCode: 400,
  },

  INVALID_FILE_TYPE: {
    message: "El tipo de archivo no está permitido",
    statusCode: 400,
  },

  FILE_TOO_LARGE: {
    message: "El archivo supera el tamaño máximo permitido de 5 MB",
    statusCode: 400,
  },

  UNEXPECTED_FILE_FIELD: {
    message: "El campo del archivo no es válido",
    statusCode: 400,
  },

  INVALID_DOCUMENT_TYPE: {
    message: "El tipo de documento no es válido",
    statusCode: 400,
  },

  FILE_SAVE_ERROR: {
    message: "No se pudo guardar el archivo",
    statusCode: 500,
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
