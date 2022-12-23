import morgan from "morgan";
import envConfig from "../../config/env.config";
import logger from "../winston/index";

const getIpFormat = () =>
  envConfig.NODE_ENV === "production" ? ":remote-addr -" : " ";

const responseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;

export const successHandler = morgan(responseFormat, {
  skip: (_req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.http(message.trim()) },
});

export const errorHandler = morgan(responseFormat, {
  skip: (_req, res) => res.statusCode < 400,
  stream: {
    write: (message) => {
      return logger.error(message.trim());
    },
  },
});
