import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

describe("Pruebas funcionales de Logger", () => {
  it("Debe ejecutar la prueba del logger correctamente", async () => {
    const response = await request(app).get("/loggerTest");

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("status");
    expect(response.body).to.have.property("message");
    expect(response.body).to.have.property("levels");

    expect(response.body.status).to.equal("success");
    expect(response.body.message).to.equal(
      "Prueba del logger ejecutada correctamente",
    );

    expect(response.body.levels).to.deep.equal([
      "debug",
      "http",
      "info",
      "warning",
      "error",
      "fatal",
    ]);
  });

  it("Debe devolver 404 cuando se accede a una ruta inexistente de Logger", async () => {
    const response = await request(app).get("/loggerTest/ruta-inexistente");

    expect(response.status).to.equal(404);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("ROUTE_NOT_FOUND");
    expect(response.body.message).to.equal("Ruta no encontrada");
  });
});
