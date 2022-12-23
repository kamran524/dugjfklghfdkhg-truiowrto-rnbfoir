import Redis from "ioredis";
import envConfig from "../config/env.config";
import logger from "../log/winston";

export const redis = new Redis({
  host: envConfig.REDIS_HOST,
});

export const redisConnect = async () => {
  try {
    const PONG = await redis.ping();
    logger.info(`Redis is connected! [${PONG}]`);
  } catch (error) {
    logger.error(`Redis connection error ! [${error}]`);
    throw error;
  }
};
