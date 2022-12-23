// import cluster from "node:cluster";
// import logger from "./log/winston";
// import os from "os";
import Application from "./app";

// if (cluster.isMaster) {
//   const CPUs = os.cpus().length;
//   logger.debug(`Number of CPUs is ${CPUs}`);
//   logger.debug(`Master PID : ${process.pid} is running`);
//   for (let i = 0; i < CPUs -2; i++) cluster.fork()
//   cluster.on("exit", (worker, code, signal) => {
//     logger.warn(`PID : ${worker.process.pid} died`);
//     cluster.fork();
//     logger.info(`PID : ${process.pid}  started`);
//   });
// }
/*if (cluster.isWorker)*/
new Application()



