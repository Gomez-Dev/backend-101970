import DeliveryRepository from "../repositories/delivery.repository.js";

class DeliveryService {
  constructor() {
    this.deliveryRepository = new DeliveryRepository();
  }

  async getAll() {
    return await this.deliveryRepository.getAll();
  }

  async create(data) {
    return await this.deliveryRepository.create(data);
  }
}

export default DeliveryService;
