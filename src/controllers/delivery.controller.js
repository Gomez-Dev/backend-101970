import DeliveryService from "../services/delivery.service.js";

class DeliveryController {
  constructor() {
    this.deliveryService = new DeliveryService();
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
}

export default DeliveryController;
