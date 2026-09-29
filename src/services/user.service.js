import UserRepository from "../repositories/user.repository.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async getById(id) {
    return await this.userRepository.getById(id);
  }

  async create(data) {
    return await this.userRepository.create(data);
  }

  async update(id, data) {
    return await this.userRepository.update(id, data);
  }

  async delete(id) {
    return await this.userRepository.delete(id);
  }
}

export default UserService;
