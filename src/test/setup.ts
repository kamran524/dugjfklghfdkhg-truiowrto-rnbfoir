import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

jest.setTimeout(30000)

let mongo: any;
beforeAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
  process.env.NODE_ENV = "test";
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  mongo && (await mongo.stop());
  await mongoose.connection.close();
});
