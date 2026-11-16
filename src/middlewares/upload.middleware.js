import UserRepository from "../repositories/user.repository.js";
import DeliveryRepository from "../repositories/delivery.repository.js";
import UserService from "../services/user.service.js";
import { DeliveryNotFoundError } from "../errors/domain.errors.js";

const userRepository = new UserRepository();
const deliveryRepository = new DeliveryRepository();
const userService = new UserService();

export const verifyUserExists = async (req, res, next) => {
  try {
    await userService.getById(req.params.id);
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyDeliveryExists = async (req, res, next) => {
  try {
    const delivery = await deliveryRepository.getById(req.params.id);

    if (!delivery) {
      throw new DeliveryNotFoundError();
    }

    next();
  } catch (error) {
    next(error);
  }
};
