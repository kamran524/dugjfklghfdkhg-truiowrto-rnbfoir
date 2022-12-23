import XmlUtil from "../util/xml.util";
import {ApiError} from "../errors/api.error";
import logger from "../log/winston";
class PaymentService {
  private readonly xmlUtill:XmlUtil;
  constructor() {
    this.xmlUtill = new XmlUtil();
  }

  async paymentEngine(status,xml){
    if (!status && xml){
      logger.error(PaymentService.name+".paymentEngine - error null param (status,xml)");
      throw ApiError.BadRequest();
    }
    const data = await this.xmlUtill.convertXmlToObject(xml);
    console.log("status",status)
    console.log("xml",data);
  }
  async approve(){

  }

  async cancel(){

  }

  async decline(){

  }
}

export default PaymentService;
