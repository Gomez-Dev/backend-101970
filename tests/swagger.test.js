import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import swaggerSpec from "../src/config/swagger.config.js";

describe("Documentación Swagger", () => {
  it("La especificación OpenAPI se genera correctamente", () => {
    expect(swaggerSpec).to.exist;
    expect(swaggerSpec.openapi).to.equal("3.0.0");
    expect(swaggerSpec.info.title).to.equal("Backend III");
    expect(swaggerSpec.paths).to.exist;
  });

  it("La documentación incluye los endpoints principales", () => {
    const expectedEndpoints = [
      ["/api/users", "get"],
      ["/api/products", "get"],
      ["/api/orders", "get"],
      ["/api/orders", "post"],
      ["/api/orders/{id}", "get"],
      ["/api/orders/{id}", "put"],
      ["/api/deliveries", "get"],
      ["/api/deliveries", "post"],
      ["/api/mocks/users", "get"],
      ["/api/mocks/orders", "get"],
      ["/api/mocks/seed", "post"],
      ["/loggerTest", "get"],
    ];

    for (const [path, method] of expectedEndpoints) {
      expect(
        swaggerSpec.paths[path]?.[method],
        `No se encontró el endpoint ${method.toUpperCase()} ${path}`,
      ).to.exist;
    }
  });

  it("Debe permitir acceder a la documentación Swagger mediante HTTP", async () => {
    const response = await request(app).get("/api/docs/");

    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.include("text/html");
    expect(response.text).to.include("swagger-ui");
  });

  it("Debe devolver 404 cuando se accede a una ruta inexistente de Swagger", async () => {
    const response = await request(app).get("/api/docs-inexistente");

    expect(response.status).to.equal(404);
    expect(response.body.status).to.equal("error");
    expect(response.body.code).to.equal("ROUTE_NOT_FOUND");
    expect(response.body.message).to.equal("Ruta no encontrada");
  });
});
