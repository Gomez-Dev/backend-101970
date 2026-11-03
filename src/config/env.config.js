import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const requiredEnvVariables = ["PORT", "MONGODB_URI", "NODE_ENV"];

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    throw new Error(`Falta la variable de entorno requerida: ${variable}`);
  }
}

export const config = {
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV,
};
