/**
 * @swagger
 * /api/mocks/users:
 *   get:
 *     tags:
 *       - Mocks
 *     summary: Generar usuarios simulados
 *     description: >
 *       Genera usuarios ficticios en memoria sin persistirlos en MongoDB.
 *       Si no se indica qty, se utiliza 1. El valor debe ser un entero entre
 *       1 y 100.
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de usuarios a generar.
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *           maximum: 100
 *     responses:
 *       '200':
 *         description: Usuarios simulados generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserInput'
 *       '400':
 *         description: Cantidad inválida o superior al máximo permitido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidQuantity:
 *                 summary: Cantidad inválida
 *                 value:
 *                   status: error
 *                   code: INVALID_MOCK_QUANTITY
 *                   message: La cantidad de mocks debe ser un número entero mayor que 0
 *               quantityExceeded:
 *                 summary: Cantidad superior al máximo
 *                 value:
 *                   status: error
 *                   code: MOCK_QUANTITY_EXCEEDED
 *                   message: La cantidad de mocks supera el máximo permitido
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/mocks/seed:
 *   post:
 *     tags:
 *       - Mocks
 *     summary: Insertar datos de prueba en MongoDB
 *     description: >
 *       Crea qty clientes, un conductor, qty pedidos y qty entregas relacionadas.
 *       Si no se indica qty, se utiliza 1. El valor debe ser un entero entre
 *       1 y 100. La operación persiste los datos en MongoDB.
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de clientes, pedidos y entregas a generar.
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *           maximum: 100
 *     responses:
 *       '201':
 *         description: Datos de prueba creados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Datos de prueba generados correctamente
 *                 payload:
 *                   type: object
 *                   properties:
 *                     usuarios:
 *                       type: integer
 *                       example: 2
 *                     pedidos:
 *                       type: integer
 *                       example: 1
 *                     entregas:
 *                       type: integer
 *                       example: 1
 *       '400':
 *         description: Cantidad inválida o superior al máximo permitido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidQuantity:
 *                 summary: Cantidad inválida
 *                 value:
 *                   status: error
 *                   code: INVALID_MOCK_QUANTITY
 *                   message: La cantidad de mocks debe ser un número entero mayor que 0
 *               quantityExceeded:
 *                 summary: Cantidad superior al máximo
 *                 value:
 *                   status: error
 *                   code: MOCK_QUANTITY_EXCEEDED
 *                   message: La cantidad de mocks supera el máximo permitido
 *       '500':
 *         description: Error al procesar los datos en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: DATABASE_ERROR
 *               message: Error al procesar los datos en la base de datos
 */
export {};
