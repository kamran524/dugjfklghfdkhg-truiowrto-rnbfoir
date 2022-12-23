import CustomerRouter from "../router/private/customer.route";
import express from "express";
import OrderRouter from "./private/order.route";
import CountryRoute from "./private/country.route";
import FlightRoute from "./private/flight.route";
import CityRoute from "./private/city.route";
import DistrictRoute from "./private/district.route";
import AddressRoute from "./private/address.route";
import BoxRoute from "./private/box.route";
import PhoneCountryCodeRoute from "./private/phone.country.code.route";
import PhoneOperatorCodeRoute from "./private/phone.operator.code.route";
import PhoneRoute from "./private/phone.route";
import CustomerBalanceRouter from "./private/customer.balance.route";
import ShopRoute from "./private/shop.route";
import ClServiceRoute from "./private/cl.service.route";
import ProductCategoryRoute from "./private/product.category.route";
import AuthRoute from "./private/auth.route";
import PrivacyPolicyRoutes from "./private/privacy.policy.route";
import FaqsRoute from "./private/faqs.route";
import PaymentRoute from "./private/payment.route";
import TariffRoute from "./private/tariffs.route";
import CampaignRoutes from "./private/campaign.route";
import PromoCodeRoutes from "./private/promo.code.route";
import ForbiddenProductRoute from './private/forbidden.product.info.route'
import RoleRouter from "./private/role.route";
import PrivilegeRoute from "./private/privilege.route";
import UserAgreementRoute from "./private/user.agreement.route";

class Routes {
  constructor(app: express.Application) {
    this.getRouters(app);
  }

  private initializePrivateRouters() {
    return [
      new CustomerRouter(),
      new OrderRouter(),
      new AuthRoute(),
      new CountryRoute(),
      new CampaignRoutes(),
      new FlightRoute(),
      new CityRoute(),
      new DistrictRoute(),
      new AddressRoute(),
      new FaqsRoute(),
      new BoxRoute(),
      new PhoneRoute(),
      new PhoneCountryCodeRoute(),
      new CustomerBalanceRouter(),
      new ProductCategoryRoute(),
      new PrivacyPolicyRoutes(),
      new PhoneOperatorCodeRoute(),
      new PromoCodeRoutes(),
      new ShopRoute(),
      new ClServiceRoute(),
      new PaymentRoute(),
      new TariffRoute(),
      new ShopRoute(),
      new ForbiddenProductRoute(),
      new RoleRouter(),
      new PrivilegeRoute(),
      new UserAgreementRoute()
  ];
  }

  private initializePublicRouters() {
    return [];
  }

  private getRouters(app: express.Application) {
    const routes = this.initializePrivateRouters().concat(this.initializePublicRouters());
    routes.forEach((route: any) => {
      app.use("/", route.router);
    });
  }

}

export default Routes;
