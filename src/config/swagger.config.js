import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend III",
      version: "1.0.0",
      description:
        "API REST desarrollada para Backend III. Incluye gestión de usuarios y productos, generación de datos de prueba y validación del sistema de logging.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local de desarrollo",
      },
    ],
    tags: [
      { name: "Users", description: "Gestión de usuarios" },
      { name: "Products", description: "Gestión de productos" },
      { name: "Orders", description: "Gestión de pedidos" },
      { name: "Deliveries", description: "Gestión de entregas" },
      { name: "Mocks", description: "Generación de datos de prueba" },
      { name: "Logger", description: "Validación del sistema de logging" },
    ],
    components: {
      schemas: {},
    },
  },
  apis: ["./src/docs/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
