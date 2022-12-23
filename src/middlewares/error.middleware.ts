import { Request, Response, NextFunction } from "express";
import {constants} from "http2";
import { ApiError } from "../errors/api.error";
import logger from "../log/winston";

export const errorMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {

  if ( err.code == 11000 ) {
    const error =err.message.split(":")[0];
    logger.error(err ? `[${req.method.toUpperCase()}] - ${err.name}: ${error} `: "Error!");
      return res.
       status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ code : 11000 , message: "MongoServerError", error});
  }
  if (err.name === "MissingSchemaError") {
    const error =err.message.split(":")[0];
    logger.error(err ? `[${req.method.toUpperCase()}] - ${err.name}: ${error} `: "Error!");
    return res.
    status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: "MissingSchemaError", error});
  }
  if (err.name === 'ValidationError'){
    const errorMessage =err.message.split(":")[0];
    for (let error in err.errors) {
      let obj =err.errors[error];
      delete obj.name;
      delete obj.properties;
      delete obj.kind;
      delete obj.path;
    }
    logger.error(err ? `[${req.method.toUpperCase()}] - ${err.name}: ${errorMessage} `: "Error!");
    return res.
       status(constants.HTTP_STATUS_PRECONDITION_FAILED)
       .send({errorName:err.name,errorMessage,errors:err.errors});
  }
  if (err instanceof ApiError) {
    const errPath = err.stack?.toString().split("\n")[2].trim();
    logger.error(
      err
        ? `[${req.method.toUpperCase()}] - ${err.name}: ${
          err.message
        } - Path: ${errPath}`
        : "Error!"
    );
    return res
      .status(err.status)
      .send({ message: err.message, errors: err.errors });
  }
  if (err.name === 'SyntaxError'){
    const errorMessage =err.message.split(":")[0];
    const filteredErrorBody = err.body.replace(/[\n ]/g,"");
    logger.error(`[${req.method.toUpperCase()}] - Syntax Error: ${errorMessage} : "Reason : ${filteredErrorBody}!`);
    return res
      .status(err.status)
      .send({ message: errorMessage, error: filteredErrorBody});
  }
  return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: "Something went wrong!" });
};
