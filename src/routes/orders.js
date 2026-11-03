import { Router } from "express";
import OrderController from "../controllers/order.controller.js";

const router = Router();
const orderController = new OrderController();

router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);

router.post("/", orderController.create);
router.put("/:id", orderController.update);

export default router;
