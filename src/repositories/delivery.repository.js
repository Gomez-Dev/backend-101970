import Delivery from "../models/delivery.model.js";

class DeliveryRepository {
  async create(data) {
    return await Delivery.create(data);
  }

  async getAll() {
    return await Delivery.find().select("-__v");
  }
}

export default DeliveryRepository;
