/**
 * @openapi
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Obtener todos los pedidos
 *     description: Devuelve el listado de pedidos registrados.
 *     responses:
 *       200:
 *         description: Listado de pedidos obtenido correctamente.
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
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: INTERNAL_SERVER_ERROR
 *               message: Error interno del servidor.
 *
 *   post:
 *     tags:
 *       - Orders
 *     summary: Crear un pedido
 *     description: Registra un nuevo pedido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Pedido creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: INTERNAL_SERVER_ERROR
 *               message: Error interno del servidor.
 *
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Obtener un pedido por ID
 *     description: Busca un pedido utilizando su identificador.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador del pedido.
 *     responses:
 *       200:
 *         description: Pedido encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Identificador inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: INVALID_ID
 *               message: El ID proporcionado no es válido
 *       404:
 *         description: Pedido inexistente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: ORDER_NOT_FOUND
 *               message: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: INTERNAL_SERVER_ERROR
 *               message: Error interno del servidor.
 *
 *   put:
 *     tags:
 *       - Orders
 *     summary: Actualizar un pedido
 *     description: Actualiza los datos de un pedido existente. Las validaciones del modelo se aplican durante la actualización.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador del pedido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       200:
 *         description: Pedido actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Identificador o datos proporcionados inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: INVALID_ID
 *               message: El ID proporcionado no es válido
 *       404:
 *         description: Pedido inexistente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: ORDER_NOT_FOUND
 *               message: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: INTERNAL_SERVER_ERROR
 *               message: Error interno del servidor.
 */
