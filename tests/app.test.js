import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

describe("Pruebas funcionales de la aplicación", () => {
  it("Debe devolver 404 cuando la ruta no existe", async () => {
    const response = await request(app).get("/ruta-inexistente");

    expect(response.status).to.equal(404);
    expect(response.body).to.have.property("status", "error");
    expect(response.body).to.have.property("code", "ROUTE_NOT_FOUND");
    expect(response.body).to.have.property("message", "Ruta no encontrada");
  });
});
