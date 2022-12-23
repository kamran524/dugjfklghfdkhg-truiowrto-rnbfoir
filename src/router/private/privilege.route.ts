import { Router } from "express";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";
import PrivilegeController from "../../controller/privilege.controller";
import { CreatePrivilegeDto } from "../../dto/privilege/create.privilege.dto";
import { ENUMS } from "../../enum/enums";
import { ParamIdDto } from "../../dto/common/param.id.dto";
import { UpdatePrivilegeDto } from "../../dto/privilege/update.privilege.dto";

class PrivilegeRoute {
  path: string;
  router: Router;
  privilegeController: PrivilegeController;
  validation: ValidationMiddleware;

  constructor() {
    this.path = "/privilege";
    this.router = Router();
    this.privilegeController = new PrivilegeController();
    this.validation = new ValidationMiddleware();
    // Routes
    this.initializeRoutes();
  }


  private initializeRoutes() {
    this.router.post(`${this.path}`, this.validation.check(CreatePrivilegeDto, ENUMS.REQUEST_OBJECTS.BODY, false, true), this.privilegeController.createPrivilege);
    this.router.get(`${this.path}`, this.privilegeController.getPrivileges);
    this.router.get(`${this.path}/:id`, this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS), this.privilegeController.getPrivilege);
    this.router.patch(`${this.path}`, this.validation.check(UpdatePrivilegeDto, ENUMS.REQUEST_OBJECTS.BODY, false, false), this.privilegeController.updatePrivilege);
    this.router.patch(`${this.path}/:id`, this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS), this.privilegeController.deletePrivilege);
  }
}

export default PrivilegeRoute;
