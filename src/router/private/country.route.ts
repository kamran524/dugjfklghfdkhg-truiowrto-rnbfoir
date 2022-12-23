import { Router } from 'express';
import CountryController from "../../controller/country.controller";
import {ValidationMiddleware} from "../../middlewares/validation.middleware";
import {CreateCountryDto} from "../../dto/country/create.country.dto";
import {UpdateCountryDto} from "../../dto/country/update.country.dto";
import {Multer} from "../../config/multer.config";
import {ParamIdDto} from "../../dto/common/param.id.dto";
import {ENUMS} from "../../enum/enums";

class CountryRoute {
  path:string;
  router:Router;
  countryController : CountryController;
  validation : ValidationMiddleware;
  multer:Multer;
  constructor() {
    this.path = "/country"
    this.router = Router();
    this.countryController = new CountryController();
    this.validation = new ValidationMiddleware();
    this.multer = new Multer();
    // Routes
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`,
      this.multer.upload().single("image"),
      this.validation.check(CreateCountryDto,ENUMS.REQUEST_OBJECTS.BODY,false,true),
      this.countryController.createCountry);
    this.router.patch(`${this.path}`,
      this.multer.upload().single("image"),
      this.validation.check(UpdateCountryDto,ENUMS.REQUEST_OBJECTS.BODY,false,false),
      this.countryController.updateCountry);
    this.router.delete(`${this.path}/:id`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.countryController.deleteCountry);
    this.router.get(`${this.path}/:id`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.countryController.getCountry);
    this.router.get(`${this.path}`, this.countryController.getCountries);
  }
}

export default CountryRoute;
