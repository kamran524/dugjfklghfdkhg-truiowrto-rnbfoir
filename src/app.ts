import express from "express";
import swaggerUI from "swagger-ui-express";
import yamljs from "yamljs";
import { errorHandler, successHandler } from "./log/morgan";
import { errorMiddleware } from "./middlewares/error.middleware";
import { processNode } from "./errors/process.error";
import bodyParser from "body-parser";
import xmlParser from "express-xml-bodyparser";
import envConfig from "./config/env.config";
import Mongo from "./databases/mongo-connect";
import { redisConnect } from "./databases/redis-connect";
import logger from "./log/winston";
import Routes from "./router/index";

class Application {
  public app: express.Application;
  public port: string | number;

  constructor() {
    this.app = express();
    this.port = envConfig.PORT;

    envConfig.NODE_ENV !== "test" && this.connections();
    this.initializeProcess();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeSwagger();
  }

  public connections() {
    Mongo.connection().then(async () => {
      await redisConnect();
      this.app.listen(envConfig.PORT, () => {
        logger.info(
          `Listening on port ${envConfig.PORT} | PID : ${process.pid} ...`
        );
      });
    });
  }

  private initializeProcess() {
    processNode;
  }

  private initializeMiddlewares() {
    this.app.use(xmlParser());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use("/public", express.static("public"));
  }
  private initializeRoutes() {
    new Routes(this.app);
  }

  private initializeSwagger() {
    const swaggerDoc = yamljs.load("./swagger.yaml");
    this.app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  }

  private initializeErrorHandling() {
    this.app.use(successHandler, errorHandler);
    this.app.use(errorMiddleware);
  }
}

export default Application;
