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
    const user = await User.create(data);

    return await User.findById(user._id).select("-password -__v");
  }

  async update(id, data) {
    return await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    }).select("-password -__v");
  }

  async delete(id) {
    const user = await User.findByIdAndDelete(id);

    if (!user) return null;

    const userData = user.toObject();
    delete userData.password;
    delete userData.__v;

    return userData;
  }
}

export default UserRepository;
