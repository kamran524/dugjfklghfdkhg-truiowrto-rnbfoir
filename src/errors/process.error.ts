import logger from "../log/winston";

const processNode = process
  .on("SIGABRT", (signal) => {
    logger.error(signal);
    process.exit(1);
  })
  .on("SIGINT", (signal) => {
    logger.error(signal);
    process.exit(1);
  })
  .on("SIGTERM", (signal) => {
    logger.error(signal);
    process.exit(1);
  })
  .on("unhandledRejection", (reason, promise) => {
    logger.error(`${promise}${reason}`);
    process.exit(1);
  })
  .on("uncaughtException", (reason, promise) => {
    logger.error(`${promise}${reason}`);
    process.exit(1);
  })
  .on("uncaughtExceptionMonitor", (reason, promise) => {
    logger.error(`${promise}${reason}`);
  })
  .on("warning", (warning) => {
    logger.warn(warning);
  });

export { processNode };
