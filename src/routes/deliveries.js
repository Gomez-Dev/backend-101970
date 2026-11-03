import { Router } from "express";
import DeliveryController from "../controllers/delivery.controller.js";

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

export default router;
