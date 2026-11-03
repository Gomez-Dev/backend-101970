import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

const createCustomer = async () => {
  const response = await request(app).post("/api/users").send({
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.orders@test.com",
    password: "Password123",
  });

  return response.body.payload._id;
};

const createOrder = async () => {
  const customerId = await createCustomer();

  return await request(app)
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
};

describe("Pruebas funcionales de Orders", () => {
  it("Debe crear un pedido correctamente", async () => {
    const response = await createOrder();

    expect(response.status).to.equal(201);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.have.property("_id");
    expect(response.body.payload.customer).to.exist;
  });

  it("Debe obtener el listado de pedidos", async () => {
    await createOrder();

    const response = await request(app).get("/api/orders");

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.be.an("array");
    expect(response.body.payload).to.have.lengthOf(1);
  });

  it("Debe obtener un pedido por su ID", async () => {
    const createdOrder = await createOrder();
    const orderId = createdOrder.body.payload._id;

    const response = await request(app).get(`/api/orders/${orderId}`);

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload._id).to.equal(orderId);
  });

  it("Debe devolver 404 cuando el pedido no existe", async () => {
    const response = await request(app).get(
      "/api/orders/000000000000000000000001",
    );

    expect(response.status).to.equal(404);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("ORDER_NOT_FOUND");
    expect(response.body.message).to.equal("Pedido no encontrado");
  });

  it("Debe devolver 400 cuando el ID es inválido", async () => {
    const response = await request(app).get("/api/orders/id-invalido");

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("INVALID_ID");
    expect(response.body.message).to.equal("El ID proporcionado no es válido");
  });

  it("Debe devolver 400 cuando faltan campos obligatorios", async () => {
    const response = await request(app).post("/api/orders").send({
      deliveryAddress: "Av. Rivadavia 1234",
    });

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("VALIDATION_ERROR");
    expect(response.body.message).to.equal(
      "Los datos proporcionados no son válidos",
    );
  });

  it("Debe actualizar el estado de un pedido correctamente", async () => {
    const createdOrder = await createOrder();
    const orderId = createdOrder.body.payload._id;
    const order = createdOrder.body.payload;

    const response = await request(app).put(`/api/orders/${orderId}`).send({
      customer: order.customer,
      items: order.items,
      deliveryAddress: order.deliveryAddress,
      total: order.total,
      status: "IN_TRANSIT",
      priority: order.priority,
    });

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload.status).to.equal("IN_TRANSIT");
  });

  it("Debe devolver 404 cuando se intenta actualizar un pedido inexistente", async () => {
    const response = await request(app)
      .put("/api/orders/000000000000000000000001")
      .send({
        customer: "000000000000000000000001",
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

    expect(response.status).to.equal(404);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("ORDER_NOT_FOUND");
    expect(response.body.message).to.equal("Pedido no encontrado");
  });

  it("Debe rechazar un estado de pedido inválido", async () => {
    const createdOrder = await createOrder();
    const orderId = createdOrder.body.payload._id;
    const order = createdOrder.body.payload;

    const response = await request(app).put(`/api/orders/${orderId}`).send({
      customer: order.customer,
      items: order.items,
      deliveryAddress: order.deliveryAddress,
      total: order.total,
      status: "ESTADO_INVALIDO",
      priority: order.priority,
    });

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("VALIDATION_ERROR");
    expect(response.body.message).to.equal(
      "Los datos proporcionados no son válidos",
    );
  });
});
