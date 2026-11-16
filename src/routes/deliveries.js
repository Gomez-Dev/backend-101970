import { Router } from "express";
import DeliveryController from "../controllers/delivery.controller.js";
import { deliveryReceiptUpload } from "../config/multer.config.js";
import { verifyDeliveryExists } from "../middlewares/upload.middleware.js";

const router = Router();
const deliveryController = new DeliveryController();

/**
 * Obtener todas las entregas.
 * GET /api/deliveries
 */
router.get("/", deliveryController.getAll);

/**
 * Crear una entrega.
 * POST /api/deliveries
 */
router.post("/", deliveryController.create);

/**
 * Cargar comprobantes de una entrega.
 * POST /api/deliveries/:id/receipts
 */
router.post(
  "/:id/receipts",
  verifyDeliveryExists,
  deliveryReceiptUpload.single("file"),
  deliveryController.uploadReceipt,
);

export default router;
