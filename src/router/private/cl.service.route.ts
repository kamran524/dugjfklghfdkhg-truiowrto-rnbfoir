import { Router } from 'express';
import ClServiceController from "../../controller/cl.service.controller";
import {ValidationMiddleware} from "../../middlewares/validation.middleware";
import {CreateClServiceDto} from "../../dto/cl.service.dto/create.cl.service.dto";
import {UpdateClServiceDto} from "../../dto//cl.service.dto/update.cl.service.dto";
import {ParamIdDto} from "../../dto/common/param.id.dto";
import {ENUMS} from "../../enum/enums";

class ClServiceRoute {
  path:string;
  router:Router;
  ClServiceController : ClServiceController;
  validation : ValidationMiddleware;

  constructor() {
    this.path = "/cl/service"
    this.router = Router();
    this.ClServiceController = new ClServiceController();
    this.validation = new ValidationMiddleware();

    // Routes
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`,
      this.validation.check(CreateClServiceDto,ENUMS.REQUEST_OBJECTS.BODY,false,true),
      this.ClServiceController.createClService);
    this.router.patch(`${this.path}/`,
      this.validation.check(UpdateClServiceDto,ENUMS.REQUEST_OBJECTS.BODY,false,false),
      this.ClServiceController.updateClService);
    this.router.delete(`${this.path}/:id`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.ClServiceController.deleteClService);
    this.router.get(`${this.path}/:id`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.ClServiceController.getClService);
    this.router.get(`${this.path}/`, this.ClServiceController.getClServices);
  }
}

export default ClServiceRoute;
