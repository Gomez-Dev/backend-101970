import fs from "node:fs/promises";
import path from "node:path";

import UserRepository from "../repositories/user.repository.js";
import DeliveryRepository from "../repositories/delivery.repository.js";

import {
  UserNotFoundError,
  DeliveryNotFoundError,
} from "../errors/domain.errors.js";

import CustomError from "../errors/custom.error.js";
import logger from "../config/logger.config.js";

const ALLOWED_DOCUMENT_TYPES = ["DNI", "DRIVER_LICENSE", "ADDRESS_PROOF"];

class UploadService {
  constructor() {
    this.userRepository = new UserRepository();
    this.deliveryRepository = new DeliveryRepository();
  }

  // Elimina el archivo físico si ocurre un error.
  async removeUploadedFile(file) {
    if (!file?.path) return;

    try {
      await fs.unlink(file.path);
    } catch (error) {
      if (error.code !== "ENOENT") {
        logger.warning(
          `No se pudo eliminar el archivo ${file.filename}: ${error.message}`,
        );
      }
    }
  }

  // Construye los metadatos comunes del archivo.
  buildFileMetadata(file, folder) {
    return {
      originalName: file.originalname,
      filename: file.filename,
      path: path.posix.join("uploads", folder, file.filename),
      mimetype: file.mimetype,
      size: file.size,
      uploadedAt: new Date(),
    };
  }

  // Carga un documento asociado a un usuario.
  async uploadUserDocument(userId, file, documentType) {
    if (!file) {
      throw new CustomError("Debes adjuntar un archivo", "FILE_REQUIRED", 400);
    }

    try {
      const user = await this.userRepository.getById(userId);

      if (!user) {
        throw new UserNotFoundError();
      }

      if (!ALLOWED_DOCUMENT_TYPES.includes(documentType)) {
        throw new CustomError(
          "El tipo de documento no es válido",
          "INVALID_DOCUMENT_TYPE",
          400,
        );
      }

      const documentData = {
        ...this.buildFileMetadata(file, "users"),
        documentType,
      };

      const updatedUser = await this.userRepository.addDocument(
        userId,
        documentData,
      );

      if (!updatedUser) {
        throw new UserNotFoundError();
      }

      logger.info(
        `Documento ${documentType} cargado correctamente para el usuario ${userId}`,
      );

      return updatedUser;
    } catch (error) {
      await this.removeUploadedFile(file);

      if (error instanceof CustomError) {
        throw error;
      }

      logger.error(
        `Error al guardar documento del usuario ${userId}: ${error.message}`,
      );

      throw new CustomError(
        "No se pudo guardar el archivo",
        "FILE_SAVE_ERROR",
        500,
      );
    }
  }

  // Carga un comprobante asociado a una entrega.
  async uploadDeliveryReceipt(deliveryId, file) {
    if (!file) {
      throw new CustomError("Debes adjuntar un archivo", "FILE_REQUIRED", 400);
    }

    try {
      const delivery = await this.deliveryRepository.getById(deliveryId);

      if (!delivery) {
        throw new DeliveryNotFoundError();
      }

      const receiptData = this.buildFileMetadata(file, "deliveries");

      const updatedDelivery = await this.deliveryRepository.addReceipt(
        deliveryId,
        receiptData,
      );

      if (!updatedDelivery) {
        throw new DeliveryNotFoundError();
      }

      logger.info(
        `Comprobante asociado correctamente a la entrega ${deliveryId}`,
      );

      return updatedDelivery;
    } catch (error) {
      await this.removeUploadedFile(file);

      if (error instanceof CustomError) {
        throw error;
      }

      logger.error(
        `Error al guardar comprobante de la entrega ${deliveryId}: ${error.message}`,
      );

      throw new CustomError(
        "No se pudo guardar el archivo",
        "FILE_SAVE_ERROR",
        500,
      );
    }
  }
}

export default UploadService;
