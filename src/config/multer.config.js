import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import CustomError from "../errors/custom.error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOADS_DIR = path.resolve(__dirname, "../../uploads");

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

// Crea las carpetas de almacenamiento si no existen.
const createUploadDirectory = (folder) => {
  const directory = path.join(UPLOADS_DIR, folder);

  fs.mkdirSync(directory, { recursive: true });

  return directory;
};

// Configuración de almacenamiento en disco.
const createStorage = (folder) => {
  return multer.diskStorage({
    destination: (req, file, callback) => {
      try {
        const directory = createUploadDirectory(folder);
        callback(null, directory);
      } catch (error) {
        callback(
          new CustomError(
            "No se pudo preparar el directorio de almacenamiento",
            "FILE_SAVE_ERROR",
            500,
          ),
        );
      }
    },

    filename: (req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      const filename = `${randomUUID()}${extension}`;

      callback(null, filename);
    },
  });
};

// Valida extensión y MIME type.
const fileFilter = (req, file, callback) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const expectedMimeType = ALLOWED_TYPES[extension];

  if (!expectedMimeType || file.mimetype !== expectedMimeType) {
    return callback(
      new CustomError(
        "El tipo de archivo no está permitido. Formatos aceptados: PDF, JPG, JPEG y PNG",
        "INVALID_FILE_TYPE",
        400,
      ),
    );
  }

  callback(null, true);
};

// Configuración común para todas las cargas.
const createUpload = (folder) => {
  return multer({
    storage: createStorage(folder),
    fileFilter,
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
  });
};

// Documentación de usuarios.
export const userDocumentUpload = createUpload("users");

// Comprobantes de entregas.
export const deliveryReceiptUpload = createUpload("deliveries");
