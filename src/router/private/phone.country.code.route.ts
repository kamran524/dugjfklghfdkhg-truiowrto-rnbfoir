import { Router } from 'express';
import CountryCodeController from "../../controller/phone.country.code.controller";
import {ValidationMiddleware} from "../../middlewares/validation.middleware";
import {CreatePhoneCountryCodeDto} from "../../dto/phone.country.code/create.phone.country.code.dto";
import {UpdatePhoneCountryCodeDto} from "../../dto/phone.country.code/update.phone.country.code.dto";
import {ParamIdDto} from "../../dto/common/param.id.dto";
import {ENUMS} from "../../enum/enums";

class PhoneCountryCodeRoute {
  path:string;
  router:Router;
  phoneCountryCodeController : CountryCodeController;
  validation : ValidationMiddleware;

  constructor() {
    this.path = "/phone/country"
    this.router = Router();
    this.phoneCountryCodeController = new CountryCodeController();
    this.validation = new ValidationMiddleware();
    // Routes
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/code`,
      this.validation.check(CreatePhoneCountryCodeDto,ENUMS.REQUEST_OBJECTS.BODY,false,true),
      this.phoneCountryCodeController.createCountryCode);
    this.router.patch(`${this.path}/code`,
      this.validation.check(UpdatePhoneCountryCodeDto,ENUMS.REQUEST_OBJECTS.BODY,false,false),
      this.phoneCountryCodeController.updateCountryCode);
    this.router.delete(`${this.path}/:id/code`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.phoneCountryCodeController.deleteCountryCode);
    this.router.get(`${this.path}/:id/code`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.phoneCountryCodeController.getCountryCode);
    this.router.get(`${this.path}/code`, this.phoneCountryCodeController.getCountryCodes);
  }
}

export default PhoneCountryCodeRoute;
