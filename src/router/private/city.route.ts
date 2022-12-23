import { Router } from 'express';
import CityController from "../../controller/city.controller";
import {ValidationMiddleware} from "../../middlewares/validation.middleware";
import {CreateCityDto} from "../../dto/city/create.city.dto";
import {UpdateCityDto} from "../../dto/city/update.city.dto";
import {ParamIdDto} from "../../dto/common/param.id.dto";
import {ENUMS} from "../../enum/enums";



class CityRoute {
  path:string;
  router:Router;
  countryController : CityController;
  validation : ValidationMiddleware;

  constructor() {
    this.path = "/city"
    this.router = Router();
    this.countryController = new CityController();
    this.validation = new ValidationMiddleware();
    // Routes
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`,
      this.validation.check(CreateCityDto,ENUMS.REQUEST_OBJECTS.BODY,false,true),
      this.countryController.createCity);
    this.router.patch(`${this.path}`,
      this.validation.check(UpdateCityDto,ENUMS.REQUEST_OBJECTS.BODY,false,false),
      this.countryController.updateCity);
    this.router.delete(`${this.path}/:id`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.countryController.deleteCity);
    this.router.get(`${this.path}/:id`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.countryController.getCity);
    this.router.get(`${this.path}`, this.countryController.getCities);
    this.router.get(`${this.path}/:id/ct`, this.countryController.getCitiesByCountry);
  }
}

export default CityRoute;
