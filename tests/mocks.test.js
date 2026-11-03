import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

import User from "../src/models/user.model.js";
import Order from "../src/models/order.model.js";
import Delivery from "../src/models/delivery.model.js";

describe("Pruebas funcionales de Mocks", () => {
  describe("GET /api/mocks/users", () => {
    it("Debe generar usuarios simulados correctamente", async () => {
      const response = await request(app).get("/api/mocks/users?qty=3");

      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal("success");
      expect(response.body.payload).to.be.an("array").with.lengthOf(3);
      expect(response.body.payload[0]).to.have.property("firstName");
      expect(response.body.payload[0]).to.have.property("lastName");
      expect(response.body.payload[0]).to.have.property("email");
      expect(response.body.payload[0]).to.have.property("role");
    });

    it("Debe generar un usuario cuando no se especifica qty", async () => {
      const response = await request(app).get("/api/mocks/users");

      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal("success");
      expect(response.body.payload).to.be.an("array").with.lengthOf(1);
    });
  });

  describe("GET /api/mocks/orders", () => {
    it("Debe generar pedidos simulados correctamente", async () => {
      const response = await request(app).get("/api/mocks/orders?qty=2");

      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal("success");
      expect(response.body.payload).to.be.an("array").with.lengthOf(2);
      expect(response.body.payload[0]).to.have.property("customer");
      expect(response.body.payload[0]).to.have.property("items");
      expect(response.body.payload[0]).to.have.property("total");
      expect(response.body.payload[0]).to.have.property("deliveryAddress");
      expect(response.body.payload[0].items).to.be.an("array");
    });
  });

  describe("Validación de cantidades", () => {
    it("Debe rechazar una cantidad igual a cero", async () => {
      const response = await request(app).get("/api/mocks/users?qty=0");

      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal("error");
      expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY");
      expect(response.body.message).to.equal(
        "La cantidad de mocks debe ser un número entero mayor que 0",
      );
    });

    it("Debe rechazar una cantidad negativa", async () => {
      const response = await request(app).get("/api/mocks/orders?qty=-1");

      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal("error");
      expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY");
      expect(response.body.message).to.equal(
        "La cantidad de mocks debe ser un número entero mayor que 0",
      );
    });

    it("Debe rechazar una cantidad decimal", async () => {
      const response = await request(app).get("/api/mocks/users?qty=1.5");

      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal("error");
      expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY");
      expect(response.body.message).to.equal(
        "La cantidad de mocks debe ser un número entero mayor que 0",
      );
    });

    it("Debe rechazar una cantidad superior al máximo permitido", async () => {
      const response = await request(app).get("/api/mocks/users?qty=101");

      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal("error");
      expect(response.body.code).to.equal("MOCK_QUANTITY_EXCEEDED");
      expect(response.body.message).to.equal(
        "La cantidad de mocks supera el máximo permitido",
      );
    });
  });

  describe("POST /api/mocks/seed", () => {
    it("Debe generar y guardar usuarios, pedidos y entregas", async () => {
      const response = await request(app).post("/api/mocks/seed?qty=2");

      expect(response.status).to.equal(201);
      expect(response.body.status).to.equal("success");
      expect(response.body.message).to.equal(
        "Datos de prueba generados correctamente",
      );

      expect(response.body.payload).to.deep.equal({
        usuarios: 3,
        pedidos: 2,
        entregas: 2,
      });

      const usersCount = await User.countDocuments();
      const ordersCount = await Order.countDocuments();
      const deliveriesCount = await Delivery.countDocuments();

      expect(usersCount).to.equal(3);
      expect(ordersCount).to.equal(2);
      expect(deliveriesCount).to.equal(2);
    });

    it("Debe rechazar una cantidad inválida para seed", async () => {
      const response = await request(app).post("/api/mocks/seed?qty=0");

      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal("error");
      expect(response.body.code).to.equal("INVALID_MOCK_QUANTITY");
      expect(response.body.message).to.equal(
        "La cantidad de mocks debe ser un número entero mayor que 0",
      );
    });
  });
});
