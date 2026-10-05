import MockService from "../services/mock.service.js";
import { MOCK_MAX_QUANTITY } from "../constants/index.js";

class MockController {
  constructor() {
    this.mockService = new MockService();
  }

  getUsers = async (req, res) => {
    try {
      const quantity = Number(req.query.qty ?? 1);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
          status: "error",
          message: "qty debe ser un número entero mayor que 0",
        });
      }

      if (quantity > MOCK_MAX_QUANTITY) {
        return res.status(400).json({
          status: "error",
          message: `qty no puede ser mayor que ${MOCK_MAX_QUANTITY}`,
        });
      }

      const users = this.mockService.generateUsers(quantity);

      res.status(200).json({
        status: "success",
        payload: users,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  seed = async (req, res) => {
    try {
      const quantity = Number(req.query.qty ?? 1);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
          status: "error",
          message: "qty debe ser un número entero mayor que 0",
        });
      }

      if (quantity > MOCK_MAX_QUANTITY) {
        return res.status(400).json({
          status: "error",
          message: `qty no puede ser mayor que ${MOCK_MAX_QUANTITY}`,
        });
      }

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
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
}

export default MockController;
