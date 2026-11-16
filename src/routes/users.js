import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { userDocumentUpload } from "../config/multer.config.js";
import { verifyUserExists } from "../middlewares/upload.middleware.js";

const router = Router();
const userController = new UserController();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);

router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Cargar documentos de un usuario
router.post(
  "/:id/documents",
  verifyUserExists,
  userDocumentUpload.single("file"),
  userController.uploadDocument,
);

export default router;
