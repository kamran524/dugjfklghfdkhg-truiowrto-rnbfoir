import logger from "../log/winston/index";
import {ApiError} from "../errors/api.error";
import xml2js from "xml2js";

class XmlUtil {
  constructor() {}

  public async convertXmlToObject(xml){
    logger.debug(XmlUtil.name+`.convertXmlToObject -- start`);
    try {
      return new Promise(resolve => {
        xml2js.parseString(xml, (err, result) => {
          console.log(err)
          if (err) resolve(null);
          logger.debug(XmlUtil.name+`.convertXmlToObject -- success`);
          resolve(result);
        });
      });
    } catch (error) {
      logger.error(XmlUtil.name+`.convertXmlToObject -- ${JSON.stringify(error)}`);
      throw ApiError.GeneralException(error);
    }
  }
}

export default XmlUtil
