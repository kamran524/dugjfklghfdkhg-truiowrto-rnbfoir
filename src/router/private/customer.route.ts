import { Router } from 'express';
import CustomerController from "../../controller/customer.controller";
import {ValidationMiddleware} from "../../middlewares/validation.middleware";
import {CreateCustomerDto} from "../../dto/customer/create.customer.dto";
import { UpdateCustomerDto } from '../../dto/customer/update.customer.dto';

class CustomerRoute {
   path:string;
   router:Router;
   customerController : CustomerController;
   validation : ValidationMiddleware;

   constructor() {
       this.path = "/customer"
       this.router = Router();
       this.customerController = new CustomerController();
       this.validation = new ValidationMiddleware();
       // Routes
       this.initializeRoutes();
   }

  private initializeRoutes() {
    this.router.post(`${this.path}`,this.validation.check(CreateCustomerDto) ,this.customerController.createCustomer);
    this.router.patch(`${this.path}`, this.validation.check(UpdateCustomerDto), this.customerController.updateCustomer);
    this.router.delete(`${this.path}/:id`, this.customerController.deleteCustomer);
    this.router.get(`${this.path}`, this.customerController.getCustomer);
    this.router.get(`${this.path}/all`, this.customerController.getCustomers);
  }
}
export default CustomerRoute;
