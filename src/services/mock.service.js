import { faker } from "@faker-js/faker";

import {
  USER_ROLES,
  ORDER_STATUS,
  DELIVERY_STATUS,
  DELIVERY_PRIORITY,
  MOCK_MAX_QUANTITY,
} from "../constants/index.js";

import UserRepository from "../repositories/user.repository.js";
import OrderRepository from "../repositories/order.repository.js";
import DeliveryRepository from "../repositories/delivery.repository.js";

import {
  InvalidMockQuantityError,
  MockQuantityExceededError,
  DatabaseError,
} from "../errors/domain.errors.js";

class MockService {
  constructor() {
    this.userRepository = new UserRepository();
    this.orderRepository = new OrderRepository();
    this.deliveryRepository = new DeliveryRepository();
  }

  validateQuantity(quantity) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new InvalidMockQuantityError();
    }

    if (quantity > MOCK_MAX_QUANTITY) {
      throw new MockQuantityExceededError();
    }
  }

  generateMockUser(role = USER_ROLES.CUSTOMER) {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password(),
      role,
    };
  }

  generateMockOrder(customerId) {
    const items = [
      {
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 5 }),
        price: faker.number.float({
          min: 1000,
          max: 50000,
          fractionDigits: 2,
        }),
      },
    ];

    const total = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );

    return {
      customer: customerId,
      items,
      deliveryAddress: faker.location.streetAddress(),
      total,
      status: ORDER_STATUS.CREATED,
      priority: DELIVERY_PRIORITY.NORMAL,
    };
  }

  generateMockDelivery(orderId, driverId) {
    return {
      order: orderId,
      driver: driverId,
      status: DELIVERY_STATUS.ASSIGNED,
      priority: DELIVERY_PRIORITY.NORMAL,
    };
  }

  generateUsers(quantity) {
    this.validateQuantity(quantity);

    return Array.from({ length: quantity }, () => this.generateMockUser());
  }

  async seed(quantity) {
    this.validateQuantity(quantity);

    try {
      const customers = [];

      for (let i = 0; i < quantity; i++) {
        const user = await this.userRepository.create(
          this.generateMockUser(USER_ROLES.CUSTOMER),
        );

        customers.push(user);
      }

      const driver = await this.userRepository.create(
        this.generateMockUser(USER_ROLES.DRIVER),
      );

      const orders = [];

      for (const customer of customers) {
        const order = await this.orderRepository.create(
          this.generateMockOrder(customer._id),
        );

        orders.push(order);
      }

      const deliveries = [];

      for (const order of orders) {
        const delivery = await this.deliveryRepository.create(
          this.generateMockDelivery(order._id, driver._id),
        );

        deliveries.push(delivery);
      }

      return {
        customers,
        driver,
        orders,
        deliveries,
      };
    } catch (error) {
      throw new DatabaseError();
    }
  }
}

export default MockService;
