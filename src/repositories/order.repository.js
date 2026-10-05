import Order from "../models/order.model.js";

class OrderRepository {
  async create(data) {
    return await Order.create(data);
  }

  async getAll() {
    return await Order.find().select("-__v");
  }
}

export default OrderRepository;
