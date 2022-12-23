import {plainToInstance} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';
import {Request,Response,NextFunction,RequestHandler} from "express";
import {ENUMS} from "../enum/enums";
import {ApiError} from "../errors/api.error";
import logger from "../log/winston";
import {Multer} from "../config/multer.config";


export class ValidationMiddleware {
     check(
           classToConvert: any,
           req_type:any = ENUMS.REQUEST_OBJECTS.BODY,
           skipMissingProperties:boolean = false,
           whitelist : boolean = true,
           forbidNonWhitelisted:boolean = true
     ):RequestHandler {
       return  async (request: Request, response: Response, next: NextFunction) => {
         try {
           logger.debug(`${ValidationMiddleware.name}.check -- start`);
           const data = plainToInstance(classToConvert, request[req_type]);
           await validate(data, {skipMissingProperties, whitelist, forbidNonWhitelisted})
               .then(async (errors: ValidationError[]) => {
                 if (errors.length > 0) {
                   const err: any = errors.map((error: ValidationError) => {
                     return {property: error.property, value: error.value, constraints: error.constraints}
                   });
                   logger.error(`${ValidationMiddleware.name}.check -- error : ${JSON.stringify(err)}`);
                   throw ApiError.ValidationError("Validation Error", err);
                 }
               });
           logger.debug(`${ValidationMiddleware.name}.validate -- success`);
           next();
         }catch (error) {
           if (request.file) await new Multer().removeFile(request.file);
           next(error);
         }
       }
     }
}

