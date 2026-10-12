/**
 * @swagger
 * /api/mocks/users:
 *   get:
 *     tags: [Mocks]
 *     summary: Generar usuarios simulados
 *     description: >
 *       Genera usuarios ficticios en memoria sin persistirlos en MongoDB.
 *       La cantidad se especifica mediante el parámetro de consulta qty.
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *           maximum: 100
 *         description: Cantidad de usuarios a generar. El máximo permitido es 100.
 *     responses:
 *       200:
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
 *       400:
 *         description: Cantidad inválida o superior al máximo permitido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/mocks/seed:
 *   post:
 *     tags: [Mocks]
 *     summary: Insertar datos de prueba en MongoDB
 *     description: >
 *       Crea qty clientes, un conductor, qty pedidos y qty entregas.
 *       Los pedidos y las entregas quedan relacionados con los usuarios creados.
 *       La cantidad se especifica mediante el parámetro de consulta qty.
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *           maximum: 100
 *         description: Cantidad de clientes, pedidos y entregas a generar. El máximo permitido es 100.
 *     responses:
 *       201:
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
 *       400:
 *         description: Cantidad inválida o superior al máximo permitido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error al procesar los datos en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export {};
