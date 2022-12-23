import mongoose from "mongoose";
import envConfig from "../config/env.config";
import logger from "../log/winston";

class Mongo {
  async connection() {
    const uri = `mongodb://${envConfig.MONGO_USER}:${envConfig.MONGO_PW}@mongo/?authMechanism=DEFAULT`;
    const connection = mongoose.connect(uri);
    mongoose.connection.once("connected", () => {
      logger.info("Mongo is connected!");
    })
      .on("error", (error) => {
        logger.error(`Error connecting to Mongo : ${JSON.stringify(error.message)}`);
      });
    return connection;
  }
}

export default new Mongo();
