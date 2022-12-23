import logger from "../log/winston/index";
import axios from "axios";
import {Agent} from "https";
import {ApiError} from "../errors/api.error";

class HttpUtil {
  constructor() {}

  public async postRequest(url:string, body : any, headers : any, httpsAgent:Agent){
   logger.debug(HttpUtil.name+`.postRequest -- start`);
    try {
     const  response = await axios.post(url, body, { headers, httpsAgent , timeout : 10000 });
      logger.debug(HttpUtil.name+`.postRequest -- success`);
      return response ? response.data : null;
    } catch (error) {
      console.log(error)
      logger.error(HttpUtil.name+`.postRequest -- error`);
      throw ApiError.GeneralException(error);
    }
  }
}

export default HttpUtil
