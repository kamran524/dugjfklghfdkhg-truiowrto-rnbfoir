import { Router } from 'express';
import AddressController from "../../controller/address.controller";
import {ValidationMiddleware} from "../../middlewares/validation.middleware";
import {CreateAddressDto} from "../../dto/address/create.address.dto";
import {UpdateAddressDto} from "../../dto/address/update.address.dto";
import {ParamIdDto} from "../../dto/common/param.id.dto";
import {ENUMS} from "../../enum/enums";



class AddressRoute {
  path:string;
  router:Router;
  countryController : AddressController;
  validation : ValidationMiddleware;

  constructor() {
    this.path = "/address"
    this.router = Router();
    this.countryController = new AddressController();
    this.validation = new ValidationMiddleware();
    // Routes
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`,
      this.validation.check(CreateAddressDto,ENUMS.REQUEST_OBJECTS.BODY,false,true),
      this.countryController.createAddress);
    this.router.patch(`${this.path}`,
      this.validation.check(UpdateAddressDto,ENUMS.REQUEST_OBJECTS.BODY,false,false),
      this.countryController.updateAddress);
    this.router.patch(`${this.path}/:id/disable`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.countryController.modifyAddressStatus);
    this.router.delete(`${this.path}/:id`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.countryController.deleteAddress);
    this.router.get(`${this.path}/:id`,
      this.validation.check(ParamIdDto,ENUMS.REQUEST_OBJECTS.PARAMS),
      this.countryController.getAddress);
    this.router.get(`${this.path}`, this.countryController.getAddresses);
  }
}



export default AddressRoute;
