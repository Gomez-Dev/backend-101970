import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach } from "mocha";

const tempDirectories = [];
const uploadedFiles = [];

const createPdfFixture = async () => {
  const directory = await fs.mkdtemp(
    path.join(os.tmpdir(), "shipnow-delivery-tests-"),
  );

  tempDirectories.push(directory);

  const filePath = path.join(directory, "comprobante.pdf");

  await fs.writeFile(filePath, "%PDF-1.4\nComprobante de prueba\n%%EOF");

  return filePath;
};

const createInvalidFileFixture = async () => {
  const directory = await fs.mkdtemp(
    path.join(os.tmpdir(), "shipnow-delivery-tests-"),
  );

  tempDirectories.push(directory);

  const filePath = path.join(directory, "archivo.txt");

  await fs.writeFile(filePath, "Archivo de texto para pruebas");

  return filePath;
};

afterEach(async () => {
  for (const filePath of uploadedFiles) {
    await fs.rm(filePath, { force: true });
  }

  uploadedFiles.length = 0;

  for (const directory of tempDirectories) {
    await fs.rm(directory, { recursive: true, force: true });
  }

  tempDirectories.length = 0;
});

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

  // Pruebas de carga de comprobantes

  it("Debe cargar un comprobante correctamente", async () => {
    const createdDelivery = await createDelivery();
    const deliveryId = createdDelivery.body.payload._id;
    const filePath = await createPdfFixture();

    const response = await request(app)
      .post(`/api/deliveries/${deliveryId}/receipts`)
      .attach("file", filePath);

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload.receipts).to.have.lengthOf(1);

    const receipt = response.body.payload.receipts[0];

    uploadedFiles.push(path.resolve(receipt.path));

    expect(receipt.originalName).to.equal("comprobante.pdf");
    expect(receipt.mimetype).to.equal("application/pdf");
    expect(receipt.size).to.be.greaterThan(0);
    expect(receipt).to.have.property("uploadedAt");
  });

  it("Debe rechazar la carga cuando no se adjunta un comprobante", async () => {
    const createdDelivery = await createDelivery();
    const deliveryId = createdDelivery.body.payload._id;

    const response = await request(app).post(
      `/api/deliveries/${deliveryId}/receipts`,
    );

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("FILE_REQUIRED");
  });

  it("Debe rechazar archivos con formatos no permitidos", async () => {
    const createdDelivery = await createDelivery();
    const deliveryId = createdDelivery.body.payload._id;
    const filePath = await createInvalidFileFixture();

    const response = await request(app)
      .post(`/api/deliveries/${deliveryId}/receipts`)
      .attach("file", filePath);

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("INVALID_FILE_TYPE");
  });

  it("Debe devolver 404 cuando se intenta cargar un comprobante en una entrega inexistente", async () => {
    const response = await request(app).post(
      "/api/deliveries/000000000000000000000001/receipts",
    );

    expect(response.status).to.equal(404);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("DELIVERY_NOT_FOUND");
    expect(response.body.message).to.equal("Entrega no encontrada");
  });

  it("Debe permitir asociar múltiples comprobantes a una misma entrega", async () => {
    const createdDelivery = await createDelivery();
    const deliveryId = createdDelivery.body.payload._id;

    const firstFile = await createPdfFixture();

    const firstResponse = await request(app)
      .post(`/api/deliveries/${deliveryId}/receipts`)
      .attach("file", firstFile);

    expect(firstResponse.status).to.equal(200);
    expect(firstResponse.body.payload.receipts).to.have.lengthOf(1);

    uploadedFiles.push(
      path.resolve(firstResponse.body.payload.receipts[0].path),
    );

    const secondFile = await createPdfFixture();

    const secondResponse = await request(app)
      .post(`/api/deliveries/${deliveryId}/receipts`)
      .attach("file", secondFile);

    expect(secondResponse.status).to.equal(200);
    expect(secondResponse.body.status).to.equal("success");
    expect(secondResponse.body.payload.receipts).to.have.lengthOf(2);

    const receipts = secondResponse.body.payload.receipts;

    uploadedFiles.push(path.resolve(receipts[1].path));

    expect(receipts[0].originalName).to.equal("comprobante.pdf");
    expect(receipts[1].originalName).to.equal("comprobante.pdf");
  });
});
