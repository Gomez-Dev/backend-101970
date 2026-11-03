import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

const createUser = async (role = "CUSTOMER") => {
  const response = await request(app)
    .post("/api/users")
    .send({
      firstName: "Juan",
      lastName: "Pérez",
      email: `juan.${role.toLowerCase()}@test.com`,
      password: "Password123",
      role,
    });

  return response.body.payload._id;
};

const createOrder = async () => {
  const customerId = await createUser();

  const response = await request(app)
    .post("/api/orders")
    .send({
      customer: customerId,
      items: [
        {
          name: "Mouse Gamer",
          quantity: 2,
          price: 25000,
        },
      ],
      deliveryAddress: "Av. Rivadavia 1234",
      total: 50000,
      status: "CREATED",
      priority: "NORMAL",
    });

  return response.body.payload._id;
};

const createDelivery = async () => {
  const orderId = await createOrder();
  const driverId = await createUser("DRIVER");

  return await request(app).post("/api/deliveries").send({
    order: orderId,
    driver: driverId,
  });
};

describe("Pruebas funcionales de Deliveries", () => {
  it("Debe crear una entrega correctamente", async () => {
    const response = await createDelivery();

    expect(response.status).to.equal(201);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.have.property("_id");
    expect(response.body.payload.order).to.exist;
    expect(response.body.payload.driver).to.exist;
  });

  it("Debe obtener el listado de entregas", async () => {
    await createDelivery();

    const response = await request(app).get("/api/deliveries");

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.be.an("array");
    expect(response.body.payload).to.have.lengthOf(1);
  });

  it("Debe asignar los valores predeterminados", async () => {
    const response = await createDelivery();

    expect(response.status).to.equal(201);
    expect(response.body.payload.status).to.equal("ASSIGNED");
    expect(response.body.payload.priority).to.equal("NORMAL");
  });

  it("Debe rechazar una entrega sin pedido", async () => {
    const driverId = await createUser("DRIVER");

    const response = await request(app).post("/api/deliveries").send({
      driver: driverId,
    });

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("VALIDATION_ERROR");
    expect(response.body.message).to.equal(
      "Los datos proporcionados no son válidos",
    );
  });

  it("Debe rechazar una entrega sin conductor", async () => {
    const orderId = await createOrder();

    const response = await request(app).post("/api/deliveries").send({
      order: orderId,
    });

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("VALIDATION_ERROR");
    expect(response.body.message).to.equal(
      "Los datos proporcionados no son válidos",
    );
  });

  it("Debe rechazar un estado inválido", async () => {
    const orderId = await createOrder();
    const driverId = await createUser("DRIVER");

    const response = await request(app).post("/api/deliveries").send({
      order: orderId,
      driver: driverId,
      status: "ESTADO_INVALIDO",
    });

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("VALIDATION_ERROR");
    expect(response.body.message).to.equal(
      "Los datos proporcionados no son válidos",
    );
  });

  it("Debe rechazar una prioridad inválida", async () => {
    const orderId = await createOrder();
    const driverId = await createUser("DRIVER");

    const response = await request(app).post("/api/deliveries").send({
      order: orderId,
      driver: driverId,
      priority: "URGENT",
    });

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("VALIDATION_ERROR");
    expect(response.body.message).to.equal(
      "Los datos proporcionados no son válidos",
    );
  });

  it("Debe devolver un array vacío cuando no hay entregas", async () => {
    const response = await request(app).get("/api/deliveries");

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.be.an("array").that.is.empty;
  });
});
