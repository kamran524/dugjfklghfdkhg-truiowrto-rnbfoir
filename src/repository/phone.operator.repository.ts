import {OperatorCodeModel} from "../models/operator.code.model";
import logger from "../log/winston";

class OperatorCodeRepository {
  constructor() {};

  public async createOperatorCode(data: any){
    logger.debug(`${OperatorCodeRepository.name}.createOperatorCode -- start`);
    const result = await OperatorCodeModel.create(data);
    logger.debug(`${OperatorCodeRepository.name}.createOperatorCode -- success`);
    return result;
  }

  public async updateOperatorCodeById(id:string,data: any){
    logger.debug(`${OperatorCodeRepository.name}.updateOperatorCodeById -- start`);
    const result = await OperatorCodeModel.updateOne({_id:id},data);
    logger.debug(`${OperatorCodeRepository.name}.updateOperatorCodeById -- success`);
    return result;
  }

  public async deleteOperatorCode(id:string){
    logger.debug(`${OperatorCodeRepository.name}.deleteOperatorCode -- start`);
    const result = await OperatorCodeModel.updateOne({_id:id},{status:false});
    logger.debug(`${OperatorCodeRepository.name}.deleteOperatorCode -- success`);
    return result;
  }

  public async findOperatorCodeById(id:string){
    logger.debug(`${OperatorCodeRepository.name}.findOperatorCodeById -- start`);
    const result = await OperatorCodeModel.findById(id);
    logger.debug(`${OperatorCodeRepository.name}.findOperatorCodeById -- success`);
    return result;
  }


  public async findOperatorCodes(){
    logger.debug(`${OperatorCodeRepository.name}.findOperatorCodes -- start`);
    const result = await OperatorCodeModel.find().lean();
    logger.debug(`${OperatorCodeRepository.name}.findOperatorCodes -- success`);
    return result;
  }
}

export default OperatorCodeRepository;
