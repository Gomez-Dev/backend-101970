import OrderService from "../services/order.service.js";

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }

  getAll = async (req, res) => {
    const orders = await this.orderService.getAll();

    res.status(200).json({
      status: "success",
      payload: orders,
    });
  };

  getById = async (req, res) => {
    const order = await this.orderService.getById(req.params.id);

    res.status(200).json({
      status: "success",
      payload: order,
    });
  };

  create = async (req, res) => {
    const order = await this.orderService.create(req.body);

    res.status(201).json({
      status: "success",
      payload: order,
    });
  };

  update = async (req, res) => {
    const order = await this.orderService.update(req.params.id, req.body);

    res.status(200).json({
      status: "success",
      payload: order,
    });
  };
}

export default OrderController;
