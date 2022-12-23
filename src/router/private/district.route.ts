import { Router } from 'express';
import DistrictController from "../../controller/district.controller";
import {ValidationMiddleware} from "../../middlewares/validation.middleware";
import {CreateDistrictDto} from "../../dto/district/create.district.dto";
import {UpdateDistrictDto} from "../../dto/district/update.district.dto";
import {ParamIdDto} from "../../dto/common/param.id.dto";
import {ENUMS} from "../../enum/enums";



class DistrictRoute {
  path:string;
  router:Router;
  countryController : DistrictController;
  validation : ValidationMiddleware;

  constructor() {
    this.path = "/district"
    this.router = Router();
    this.countryController = new DistrictController();
    this.validation = new ValidationMiddleware();
    // Routes
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`,
      this.validation.check(CreateDistrictDto,ENUMS.REQUEST_OBJECTS.BODY,false,true),
      this.countryController.createDistrict);
    this.router.patch(`${this.path}`,
      this.validation.check(UpdateDistrictDto,ENUMS.REQUEST_OBJECTS.BODY,false,false),
      this.countryController.updateDistrict);
    this.router.delete(`${this.path}/:id`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.countryController.deleteDistrict);
    this.router.get(`${this.path}/:id`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.countryController.getDistrict);
    this.router.get(`${this.path}`, this.countryController.getDistricts);
    this.router.get(`${this.path}/:id/ct`, this.countryController.getDistrictsByCity);
  }
}

export default DistrictRoute;
