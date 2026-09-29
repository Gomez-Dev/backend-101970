import Product from "../models/product.model.js";

class ProductRepository {
  async getAll() {
    return await Product.find().select("-__v");
  }

  async getById(id) {
    return await Product.findById(id).select("-__v");
  }

  async create(data) {
    return await Product.create(data);
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).select("-__v");
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default ProductRepository;
