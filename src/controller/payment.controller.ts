import { Request, Response, NextFunction } from "express";
import { constants } from "http2";
import logger from "../log/winston";
import KapitalBankClient from "../client/kapital/kapital.bank.client";
import PaymentService from "../services/payment.service";
import {ENUMS} from "../enum/enums";
export class PaymentController{
  private readonly paymentService : PaymentService;
  constructor() {
  this.paymentService=new PaymentService();
  }
  public test = async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.debug(`${PaymentController.name}.test -- start`);
      const payment = new KapitalBankClient();
      const result = await payment.createKapitalPayment(5,ENUMS.LANGUAGE.AZERBAIJANI);
      logger.debug(`${PaymentController.name}.test -- success`);
      response.status(constants.HTTP_STATUS_OK).send(`https://tstpg.kapitalbank.az/index.jsp?ORDERID=${result.orderId}&SESSIONID=${result.sessionId}`);
    } catch (error) {
      next(error);
    }
  }

  public paymentCondition = async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.debug(`${PaymentController.name}.approvePayment -- start`);
      const result = await this.paymentService.paymentEngine(request.query.status,request.body);
      logger.debug(`${PaymentController.name}.approvePayment -- success`);
      response.status(constants.HTTP_STATUS_OK).send("ok");
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

}
