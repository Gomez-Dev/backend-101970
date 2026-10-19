import MockService from "../services/mock.service.js";

class MockController {
  constructor() {
    this.mockService = new MockService();
  }

  getUsers = async (req, res, next) => {
    try {
      const rawQuantity = req.query.qty;
      const quantity = rawQuantity === undefined ? 1 : Number(rawQuantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          status: "error",
          code: "INVALID_MOCK_QUANTITY",
          message: "La cantidad de mocks debe ser un número entero mayor que 0",
        });
      }

      const users = this.mockService.generateUsers(quantity);

      return res.status(200).json({
        status: "success",
        payload: users,
      });
    } catch (error) {
      next(error);
    }
  };

  seed = async (req, res, next) => {
    try {
      const rawQuantity = req.query.qty;
      const quantity = rawQuantity === undefined ? 1 : Number(rawQuantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          status: "error",
          code: "INVALID_MOCK_QUANTITY",
          message: "La cantidad de mocks debe ser un número entero mayor que 0",
        });
      }

      const result = await this.mockService.seed(quantity);

      return res.status(201).json({
        status: "success",
        message: "Datos de prueba generados correctamente",
        payload: {
          usuarios: result.customers.length + 1,
          pedidos: result.orders.length,
          entregas: result.deliveries.length,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default MockController;
