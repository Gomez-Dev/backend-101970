import Order from "../models/order.model.js";

class OrderRepository {
  async create(data) {
    return await Order.create(data);
  }

  async getAll() {
    return await Order.find().select("-__v");
  }

  async getById(id) {
    return await Order.findById(id).select("-__v");
  }

  async update(id, data) {
    return await Order.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    }).select("-__v");
  }
}

export default OrderRepository;
