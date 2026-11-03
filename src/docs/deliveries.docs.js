/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     tags:
 *       - Deliveries
 *     summary: Listar todas las entregas
 *     description: Devuelve todas las entregas registradas en la base de datos.
 *     responses:
 *       200:
 *         description: Entregas obtenidas correctamente.
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
 *                     $ref: '#/components/schemas/Delivery'
 *       500:
 *         description: Error interno al consultar las entregas.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     tags:
 *       - Deliveries
 *     summary: Crear una entrega
 *     description: Registra una entrega asociada a un pedido y un conductor existentes.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order
 *               - driver
 *             properties:
 *               order:
 *                 type: string
 *                 description: ID del pedido.
 *                 example: 65a123456789abcdef123456
 *               driver:
 *                 type: string
 *                 description: ID del conductor.
 *                 example: 65b123456789abcdef123456
 *               status:
 *                 type: string
 *                 enum:
 *                   - ASSIGNED
 *                 default: ASSIGNED
 *               priority:
 *                 type: string
 *                 enum:
 *                   - LOW
 *                   - NORMAL
 *                   - HIGH
 *                 default: NORMAL
 *     responses:
 *       201:
 *         description: Entrega creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/Delivery'
 *       500:
 *         description: Error interno al crear la entrega.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export {};
