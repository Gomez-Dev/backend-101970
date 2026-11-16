import Delivery from "../models/delivery.model.js";

class DeliveryRepository {
  async create(data) {
    return await Delivery.create(data);
  }

  async getAll() {
    return await Delivery.find().select("-__v");
  }

  async getById(id) {
    return await Delivery.findById(id).select("-__v");
  }

  async addReceipt(id, receiptData) {
    return await Delivery.findByIdAndUpdate(
      id,
      { $push: { receipts: receiptData } },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).select("-__v");
  }
}

export default DeliveryRepository;
