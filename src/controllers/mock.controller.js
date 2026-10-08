import MockService from "../services/mock.service.js";

class MockController {
  constructor() {
    this.mockService = new MockService();
  }

  getUsers = async (req, res) => {
    const quantity = Number(req.query.qty ?? 1);

    const users = this.mockService.generateUsers(quantity);

    res.status(200).json({
      status: "success",
      payload: users,
    });
  };

  seed = async (req, res) => {
    const quantity = Number(req.query.qty ?? 1);

    const result = await this.mockService.seed(quantity);

    res.status(201).json({
      status: "success",
      message: "Datos de prueba generados correctamente",
      payload: {
        usuarios: result.customers.length + 1,
        pedidos: result.orders.length,
        entregas: result.deliveries.length,
      },
    });
  };
}

export default MockController;
