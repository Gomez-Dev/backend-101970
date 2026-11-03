import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

describe("Pruebas funcionales de Logger", () => {
  it("Debe ejecutar la prueba del logger correctamente", async () => {
    const response = await request(app).get("/loggerTest");

    // Código HTTP
    expect(response.status).to.equal(200);

    // Estructura de la respuesta
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("status");
    expect(response.body).to.have.property("message");
    expect(response.body).to.have.property("levels");

    // Estado y mensaje
    expect(response.body.status).to.equal("success");
    expect(response.body.message).to.equal(
      "Prueba del logger ejecutada correctamente",
    );

    // Niveles de logging
    expect(response.body.levels).to.deep.equal([
      "debug",
      "http",
      "info",
      "warning",
      "error",
      "fatal",
    ]);
  });
});
