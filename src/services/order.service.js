import OrderRepository from "../repositories/order.repository.js";
import { OrderNotFoundError } from "../errors/domain.errors.js";

class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async getAll() {
    return await this.orderRepository.getAll();
  }

  async getById(id) {
    const order = await this.orderRepository.getById(id);

    if (!order) {
      throw new OrderNotFoundError();
    }

    return order;
  }

  async create(data) {
    return await this.orderRepository.create(data);
  }

  async update(id, data) {
    const order = await this.orderRepository.update(id, data);

    if (!order) {
      throw new OrderNotFoundError();
    }

    return order;
  }
}

export default OrderService;
