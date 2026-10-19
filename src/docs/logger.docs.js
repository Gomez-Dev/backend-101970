/**
 * @swagger
 * /loggerTest:
 *   get:
 *     tags:
 *       - Logger
 *     summary: Probar los niveles de logging
 *     description: >
 *       Endpoint de validación técnica que genera registros de prueba
 *       en los distintos niveles configurados en Winston.
 *       No realiza operaciones de negocio.
 *     responses:
 *       '200':
 *         description: Prueba de logging ejecutada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - message
 *                 - levels
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Prueba del logger ejecutada correctamente
 *                 levels:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - debug
 *                     - http
 *                     - info
 *                     - warning
 *                     - error
 *                     - fatal
 *       '500':
 *         description: Error interno durante la prueba.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export {};
