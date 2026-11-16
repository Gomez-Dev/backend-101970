import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach } from "mocha";

const tempDirectories = [];
const uploadedFiles = [];

const createFileFixture = async (filename, content) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "shipnow-tests-"));

  tempDirectories.push(directory);

  const filePath = path.join(directory, filename);

  await fs.writeFile(filePath, content);

  return filePath;
};

const createPdfFixture = async () => {
  return createFileFixture(
    "documento.pdf",
    "%PDF-1.4\nContenido de prueba\n%%EOF",
  );
};

const createInvalidFileFixture = async () => {
  return createFileFixture("documento.txt", "Este archivo no está permitido");
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

const validUser = {
  firstName: "Juan",
  lastName: "Pérez",
  email: "juan.perez@test.com",
  password: "Password123",
};

const createUser = async () => {
  return request(app).post("/api/users").send(validUser);
};

describe("Pruebas funcionales de Users", () => {
  it("Debe crear un usuario correctamente", async () => {
    const response = await createUser();

    expect(response.status).to.equal(201);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.have.property("_id");
    expect(response.body.payload.email).to.equal(validUser.email);
    expect(response.body.payload).not.to.have.property("password");
  });

  it("Debe obtener el listado de usuarios", async () => {
    await createUser();

    const response = await request(app).get("/api/users");

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.be.an("array");
    expect(response.body.payload).to.have.lengthOf(1);
    expect(response.body.payload[0]).not.to.have.property("password");
  });

  it("Debe obtener un usuario por su ID", async () => {
    const createdUser = await createUser();
    const userId = createdUser.body.payload._id;

    const response = await request(app).get(`/api/users/${userId}`);

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload._id).to.equal(userId);
    expect(response.body.payload).not.to.have.property("password");
  });

  it("Debe devolver 404 cuando el usuario no existe", async () => {
    const response = await request(app).get(
      "/api/users/000000000000000000000001",
    );

    expect(response.status).to.equal(404);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("USER_NOT_FOUND");
    expect(response.body.message).to.equal("Usuario no encontrado");
  });

  it("Debe devolver 400 cuando el ID es inválido", async () => {
    const response = await request(app).get("/api/users/id-invalido");

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("INVALID_ID");
    expect(response.body.message).to.equal("El ID proporcionado no es válido");
  });

  it("Debe devolver 400 cuando faltan campos obligatorios", async () => {
    const response = await request(app).post("/api/users").send({
      firstName: "Juan",
    });

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("VALIDATION_ERROR");
    expect(response.body.message).to.equal(
      "Los datos proporcionados no son válidos",
    );
  });

  it("Debe actualizar un usuario correctamente", async () => {
    const createdUser = await createUser();
    const userId = createdUser.body.payload._id;

    const response = await request(app).put(`/api/users/${userId}`).send({
      firstName: "Carlos",
    });

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload.firstName).to.equal("Carlos");
    expect(response.body.payload).not.to.have.property("password");
  });

  it("Debe devolver 404 cuando se intenta actualizar un usuario inexistente", async () => {
    const response = await request(app)
      .put("/api/users/000000000000000000000001")
      .send({
        firstName: "Carlos",
      });

    expect(response.status).to.equal(404);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("USER_NOT_FOUND");
    expect(response.body.message).to.equal("Usuario no encontrado");
  });

  it("Debe eliminar un usuario correctamente", async () => {
    const createdUser = await createUser();
    const userId = createdUser.body.payload._id;

    const response = await request(app).delete(`/api/users/${userId}`);

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload._id).to.equal(userId);
    expect(response.body.payload).not.to.have.property("password");
  });

  it("Debe devolver 404 cuando se intenta eliminar un usuario inexistente", async () => {
    const response = await request(app).delete(
      "/api/users/000000000000000000000001",
    );

    expect(response.status).to.equal(404);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("USER_NOT_FOUND");
    expect(response.body.message).to.equal("Usuario no encontrado");
  });

  // Pruebas de carga de documentos

  it("Debe cargar un documento correctamente", async () => {
    const createdUser = await createUser();
    const userId = createdUser.body.payload._id;
    const filePath = await createPdfFixture();

    const response = await request(app)
      .post(`/api/users/${userId}/documents`)
      .field("documentType", "DNI")
      .attach("file", filePath);

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload.documents).to.have.lengthOf(1);

    const document = response.body.payload.documents[0];

    expect(document.originalName).to.equal("documento.pdf");
    expect(document.mimetype).to.equal("application/pdf");
    expect(document.documentType).to.equal("DNI");
    expect(document.size).to.be.greaterThan(0);
    expect(document).to.have.property("uploadedAt");

    uploadedFiles.push(path.resolve(document.path));
  });

  it("Debe rechazar la carga cuando no se adjunta un archivo", async () => {
    const createdUser = await createUser();
    const userId = createdUser.body.payload._id;

    const response = await request(app)
      .post(`/api/users/${userId}/documents`)
      .field("documentType", "DNI");

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("FILE_REQUIRED");
  });

  it("Debe rechazar un tipo de documento inválido", async () => {
    const createdUser = await createUser();
    const userId = createdUser.body.payload._id;
    const filePath = await createPdfFixture();

    const response = await request(app)
      .post(`/api/users/${userId}/documents`)
      .field("documentType", "PASAPORTE")
      .attach("file", filePath);

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("INVALID_DOCUMENT_TYPE");
  });

  it("Debe rechazar archivos con formatos no permitidos", async () => {
    const createdUser = await createUser();
    const userId = createdUser.body.payload._id;
    const filePath = await createInvalidFileFixture();

    const response = await request(app)
      .post(`/api/users/${userId}/documents`)
      .field("documentType", "DNI")
      .attach("file", filePath);

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("INVALID_FILE_TYPE");
  });
});
