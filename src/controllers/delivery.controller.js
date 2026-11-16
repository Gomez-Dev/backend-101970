import DeliveryService from "../services/delivery.service.js";
import UploadService from "../services/upload.service.js";

class DeliveryController {
  constructor() {
    this.deliveryService = new DeliveryService();
    this.uploadService = new UploadService();
  }

  getAll = async (req, res, next) => {
    try {
      const deliveries = await this.deliveryService.getAll();

      return res.status(200).json({
        status: "success",
        payload: deliveries,
      });
    } catch (error) {
      return next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const delivery = await this.deliveryService.create(req.body);

      return res.status(201).json({
        status: "success",
        payload: delivery,
      });
    } catch (error) {
      return next(error);
    }
  };

  uploadReceipt = async (req, res, next) => {
    try {
      const delivery = await this.uploadService.uploadDeliveryReceipt(
        req.params.id,
        req.file,
      );

      return res.status(200).json({
        status: "success",
        message: "Comprobante cargado correctamente",
        payload: delivery,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default DeliveryController;
