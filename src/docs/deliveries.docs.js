/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     tags:
 *       - Deliveries
 *     summary: Listar todas las entregas
 *     description: Devuelve todas las entregas registradas en la base de datos.
 *     responses:
 *       '200':
 *         description: Entregas obtenidas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - payload
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Delivery'
 *       '500':
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
 *       '201':
 *         description: Entrega creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - payload
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/Delivery'
 *       '400':
 *         description: Datos de la entrega inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Error interno al crear la entrega.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/deliveries/{id}/receipts:
 *   post:
 *     tags:
 *       - Deliveries
 *     summary: Cargar un comprobante de entrega
 *     description: Permite asociar múltiples comprobantes PDF, JPG, JPEG o PNG a una entrega existente. Cada solicitud permite cargar un archivo de hasta 5 MB.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador MongoDB de la entrega.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF, JPG, JPEG o PNG. Máximo 5 MB.
 *     responses:
 *       '200':
 *         description: Comprobante cargado y asociado correctamente a la entrega.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - message
 *                 - payload
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Comprobante cargado correctamente
 *                 payload:
 *                   $ref: '#/components/schemas/Delivery'
 *       '400':
 *         description: Archivo faltante, formato no permitido, tamaño excedido o campo de archivo incorrecto.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: Entrega no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Error interno al guardar el comprobante.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export {};
