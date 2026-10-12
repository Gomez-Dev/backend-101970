/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador del usuario.
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         role:
 *           type: string
 *           enum: [ADMIN, CUSTOMER, DRIVER, STORE]
 *
 *     UserInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         role:
 *           type: string
 *           enum: [ADMIN, CUSTOMER, DRIVER, STORE]
 *           description: Campo sujeto a las reglas de autorización del endpoint.
 *
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           minimum: 0
 *         stock:
 *           type: number
 *           minimum: 0
 *         status:
 *           type: string
 *           enum: [AVAILABLE, OUT_OF_STOCK]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ProductInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - stock
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           minimum: 0
 *         stock:
 *           type: number
 *           minimum: 0
 *         status:
 *           type: string
 *           enum: [AVAILABLE, OUT_OF_STOCK]
 *           description: El servicio determina automáticamente el estado según el stock.
 *
 *     OrderItem:
 *       type: object
 *       required:
 *         - name
 *         - quantity
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         quantity:
 *           type: number
 *           minimum: 1
 *         price:
 *           type: number
 *           minimum: 0
 *
 *     Order:
 *       type: object
 *       required:
 *         - customer
 *         - items
 *         - deliveryAddress
 *         - total
 *       properties:
 *         _id:
 *           type: string
 *         customer:
 *           type: string
 *           description: Identificador del usuario cliente.
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         deliveryAddress:
 *           type: string
 *         total:
 *           type: number
 *           minimum: 0
 *         status:
 *           type: string
 *           enum: [CREATED, ASSIGNED, PICKED_UP, IN_TRANSIT, DELIVERED, CANCELLED]
 *           default: CREATED
 *         priority:
 *           type: string
 *           enum: [LOW, NORMAL, HIGH]
 *           default: NORMAL
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Delivery:
 *       type: object
 *       required:
 *         - order
 *         - driver
 *       properties:
 *         _id:
 *           type: string
 *         order:
 *           type: string
 *           description: Identificador del pedido asociado.
 *         driver:
 *           type: string
 *           description: Identificador del usuario conductor.
 *         status:
 *           type: string
 *           enum: [ASSIGNED]
 *           default: ASSIGNED
 *         priority:
 *           type: string
 *           enum: [LOW, NORMAL, HIGH]
 *           default: NORMAL
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         code:
 *           type: string
 *           example: USER_NOT_FOUND
 *         message:
 *           type: string
 *           example: Usuario no encontrado
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *         payload:
 *           type: object
 */
export {};
