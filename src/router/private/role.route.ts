import { Router } from "express";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";
import RoleController from "../../controller/role.controller";
import { CreateRoleDto } from "../../dto/role.dto/create.role.dto";
import { ENUMS } from "../../enum/enums";
import { ParamIdDto } from "../../dto/common/param.id.dto";
import { UpdateRoleDto } from "../../dto/role.dto/update.role.dto";

class RoleRouter {
  private readonly path: string;
  private readonly router: Router;
  private readonly roleController: RoleController;
  private readonly validation: ValidationMiddleware;

  constructor() {
    this.path = "/role";
    this.router = Router();
    this.roleController = new RoleController();
    this.validation = new ValidationMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.validation.check(CreateRoleDto, ENUMS.REQUEST_OBJECTS.BODY, false, true), this.roleController.createRole);
    this.router.get(`${this.path}`, this.roleController.getRoles);
    this.router.get(`${this.path}/:id`, this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS), this.roleController.getRole);
    this.router.patch(`${this.path}`, this.validation.check(UpdateRoleDto, ENUMS.REQUEST_OBJECTS.BODY, false, false), this.roleController.updateRole);
    this.router.patch(`${this.path}/:id`, this.validation.check(ParamIdDto, ENUMS.REQUEST_OBJECTS.PARAMS), this.roleController.deleteRole);
  }
}

export default RoleRouter;
