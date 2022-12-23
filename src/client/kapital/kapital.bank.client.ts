import logger from "../../log/winston";
import {ApiError} from "../../errors/api.error";
import {Agent} from "https";
import envConfig from "../../config/env.config";
import HttpUtil from "../../util/http.util";
import XmlUtil from "../../util/xml.util";
import {readFileSync} from "fs";
import KapitalBankXml from "./xml/kapital.bank.xml";


class KapitalBankClient {
  private readonly httpsAgent:Agent;
  private  httpUtil : HttpUtil;
  private  xmlUtil : XmlUtil;
  private xmlTemplate:KapitalBankXml;

  constructor() {
    const crt = envConfig.KAPITAL_BANK_CRT;
    const key = envConfig.KAPITAL_BANK_MERCHANT_KEY;
    this.xmlTemplate = new KapitalBankXml()
    this.httpUtil = new HttpUtil();
    this.xmlUtil = new XmlUtil();

   this.httpsAgent  = new Agent({
     cert: readFileSync(crt),
     key: readFileSync(key),
     rejectUnauthorized: false,
      });
    }


  async createKapitalPayment(amount,language) {
    logger.debug(KapitalBankClient.name + `.createKapitalPayment - start`);
    try {
      if (!amount) {
        logger.warn("Kapital Bank Payment Error - No amount is provided ");
        throw ApiError.BadRequest("No BANK amount is provided");
      }

      const xml = await this.xmlTemplate.createOrderXml(amount,language);
      const responseJson : any = await this.sendRequestForPayment(xml);
      if (!responseJson || !responseJson.TKKPG || !responseJson.TKKPG.Response) {
        logger.warn(KapitalBankClient.name + `.createKapitalPayment - could not convert to json`);
        return null;
      }
      logger.debug(KapitalBankClient.name + `.createKapitalPayment - success`);
      return {
        status: responseJson.TKKPG.Response[0].Status[0],
        orderId: responseJson.TKKPG.Response[0].Order[0].OrderID[0],
        sessionId: responseJson.TKKPG.Response[0].Order[0].SessionID[0],
        url: responseJson.TKKPG.Response[0].Order[0].URL[0],
      };
    }catch (error){
      logger.error(KapitalBankClient.name + `.createKapitalPayment - error`);
    }
  }

  async sendRequestForPayment(xml){
    logger.debug(KapitalBankClient.name+`.sendRequest - start`);
    const path  = envConfig.KAPITAL_BANK_API;
      const responseXml = await this.httpUtil.postRequest(
        path,
        xml,
        { 'Content-Type': 'text/xml;charset=UTF-8'},
        this.httpsAgent
      );
    const convert = await this.xmlUtil.convertXmlToObject(responseXml);
    if (!convert){
      logger.warn(KapitalBankClient.name+`.sendRequest - can not convert value = null`);
      return null;
    }
    logger.debug(KapitalBankClient.name+`.sendRequest - success`);
    return convert;
  }

  async paymentStatus(orderId:string, sessionId:string,language){
    logger.debug(KapitalBankClient.name + `.paymentStatus - start`);
    const xml = this.xmlTemplate.paymentStatus(orderId,sessionId,language)
    const responseJson : any = await this.sendRequestForPayment(xml);
    console.log(responseJson)
    if (!responseJson || !responseJson.TKKPG || !responseJson.TKKPG.Response) {
      logger.warn(KapitalBankClient.name + `.paymentStatus - could not convert to json`);
      return null;
    }
    logger.debug(KapitalBankClient.name + `.paymentStatus - success`);
    return {
      orderId: responseJson.TKKPG.Response[0].Order[0].OrderID[0],
      status: responseJson.TKKPG.Response[0].Order[0].OrderStatus[0],
    };
  }

  async getOrderInformation(orderId:string, sessionId:string){
    logger.debug(KapitalBankClient.name + `.getOrderInformation - start`);
    const xml = await this.xmlTemplate.getPaymentInformation(orderId,sessionId);
    const responseJson : any = await this.sendRequestForPayment(xml);
    if (!responseJson || !responseJson.TKKPG || !responseJson.TKKPG.Response) {
      logger.warn(KapitalBankClient.name + `.getOrderInformation - could not convert to json`);
      return null;
    }
    logger.debug(KapitalBankClient.name + `.getOrderInformation - success`);
    return {
      id: responseJson.Order.row.id,
      orderType:  responseJson.Order.row.OrderType,
      sessionID:  responseJson.Order.row.SessionID,
      createDate : responseJson.Order.row.createDate,
      lastUpdateDate : responseJson.Order.row.lastUpdateDate,
      payDate : responseJson.Order.row.payDate,
      amount : responseJson.Order.row.Amount,
      orderLanguage : responseJson.Order.row.OrderLanguage,
      description : responseJson.Order.row.Description,
    };
  }
}

export default KapitalBankClient
