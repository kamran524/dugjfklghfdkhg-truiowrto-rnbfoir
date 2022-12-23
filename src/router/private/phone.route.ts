import { Router } from 'express';
import PhoneController from "../../controller/phone.controller";
import {ValidationMiddleware} from "../../middlewares/validation.middleware";
import {CreatePhoneDto} from "../../dto/phone/create.phone.dto";
import {UpdatePhoneDto} from "../../dto/phone/update.phone.dto";
import {ParamIdDto} from "../../dto/common/param.id.dto";
import {ENUMS} from "../../enum/enums";

class PhoneRoute {
  path:string;
  router:Router;
  phonePhoneController : PhoneController;
  validation : ValidationMiddleware;

  constructor() {
    this.path = "/phone"
    this.router = Router();
    this.phonePhoneController = new PhoneController();
    this.validation = new ValidationMiddleware();
    // Routes
    this.initializeRoutes();
  }


  private initializeRoutes() {
    this.router.post(`${this.path}`,
      this.validation.check(CreatePhoneDto,ENUMS.REQUEST_OBJECTS.BODY,false,true),
      this.phonePhoneController.createPhone);
    this.router.patch(`${this.path}`,
      this.validation.check(UpdatePhoneDto,ENUMS.REQUEST_OBJECTS.BODY,false,false),
      this.phonePhoneController.updatePhone);
    this.router.delete(`${this.path}/:id`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.phonePhoneController.deletePhone);
    this.router.get(`${this.path}/:id`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.phonePhoneController.getPhone);
    this.router.get(`${this.path}`, this.phonePhoneController.getPhones);
  }
}

export default PhoneRoute;
