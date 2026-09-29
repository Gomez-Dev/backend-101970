import User from "../models/user.model.js";

class UserRepository {
  async getAll() {
    return await User.find().select("-password -__v");
  }

  async getById(id) {
    return await User.findById(id).select("-password -__v");
  }

  async getByEmail(email) {
    return await User.findOne({ email });
  }

  async create(data) {
    return await User.create(data);
  }

  async update(id, data) {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).select("-password -__v");
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default UserRepository;
