import { Router } from 'express';
import PhoneOperatorCodeController from "../../controller/phone.country.code.controller";
import {ValidationMiddleware} from "../../middlewares/validation.middleware";
import {CreatePhoneOperatorCodeDto} from "../../dto/phone.operator.code/create.phone.operator.dto";
import {UpdatePhoneOperatorCodeDto} from "../../dto/phone.operator.code/update.phone.operator.dto";
import {ParamIdDto} from "../../dto/common/param.id.dto";
import {ENUMS} from "../../enum/enums";

class PhoneOperatorCodeRoute {
  path:string;
  router:Router;
  countryController : PhoneOperatorCodeController;
  validation : ValidationMiddleware;

  constructor() {
    this.path = "/phone/operator"
    this.router = Router();
    this.countryController = new PhoneOperatorCodeController();
    this.validation = new ValidationMiddleware();

    // Routes
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/code`,
      this.validation.check(CreatePhoneOperatorCodeDto,ENUMS.REQUEST_OBJECTS.BODY,false,true),
      this.countryController.createCountryCode);
    this.router.patch(`${this.path}/code`,
      this.validation.check(UpdatePhoneOperatorCodeDto,ENUMS.REQUEST_OBJECTS.BODY,false,false),
      this.countryController.updateCountryCode);
    this.router.delete(`${this.path}/:id/code`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.countryController.deleteCountryCode);
    this.router.get(`${this.path}/:id/code`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.countryController.getCountryCode);
    this.router.get(`${this.path}/code`, this.countryController.getCountryCodes);
  }
}

export default PhoneOperatorCodeRoute;
