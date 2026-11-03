import mongoose from "mongoose";
import { config } from "../src/config/env.config.js";
import { before, beforeEach, after } from "mocha";

before(async () => {
  await mongoose.connect(config.mongoUri);
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

after(async () => {
  await mongoose.disconnect();
});
