import { MongoMemoryServer } from "mongodb-memory-server";
import * as mongoose from "mongoose";
import config from "./testConfig";

export = async function globalSetup() {
  // Config to decide if an mongodb-memory-server instance should be used
  // it's needed in global space, because we don't want to create a new instance every test-suite.
  if (!config.Memory) {
    process.env.MONGO_URI = `mongodb://${config.IP}:${config.Port}`;
  }

  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  (global as any).__MONGOINSTANCE = instance;

  console.log("my uri", uri);
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf("/"));

  // The following is to make sure the database is clean before a test suite starts
  const conn = await mongoose.connect(
    `${process.env.MONGO_URI}/${config.Database}`
  );

  // conn.connection.db might be undefined, so we need to check it
  if (conn.connection.db) {
    await conn.connection.db.dropDatabase();
  }

  await mongoose.disconnect();
};
