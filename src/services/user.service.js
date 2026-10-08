import UserRepository from "../repositories/user.repository.js";
import { UserNotFoundError } from "../errors/domain.errors.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async getById(id) {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async create(data) {
    return await this.userRepository.create(data);
  }

  async update(id, data) {
    const user = await this.userRepository.update(id, data);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async delete(id) {
    const user = await this.userRepository.delete(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}

export default UserService;
