import {BranchModel} from "../models/branch.model";
import logger from "../log/winston";

class BranchRepository {
  constructor() {};

  public async createBranch(data: any){
    logger.debug(`${BranchRepository.name}.createBranch -- start`);
    const result = await BranchModel.create(data);
    logger.debug(`${BranchRepository.name}.createBranch -- success`);
    return result;
  }

  public async updateBranchById(id:string,data: any){
    logger.debug(`${BranchRepository.name}.updateBranchById -- start`);
    const result = await BranchModel.updateOne({_id:id},data);
    logger.debug(`${BranchRepository.name}.updateBranchById -- success`);
    return result;
  }

  public async deleteBranch(id:string){
    logger.debug(`${BranchRepository.name}.deleteBranch -- start`);
    const result = await BranchModel.updateOne({_id:id},{status:false});
    logger.debug(`${BranchRepository.name}.deleteBranch -- success`);
    return result;
  }

  public async findBranchById(id:string){
    logger.debug(`${BranchRepository.name}.findBranchById -- start`);
    const result = await BranchModel.findById(id);
    logger.debug(`${BranchRepository.name}.findBranchById -- success`);
    return result;
  }


  public async findBranches(){
    logger.debug(`${BranchRepository.name}.findBranches -- start`);
    const result = await BranchModel.find().lean();
    logger.debug(`${BranchRepository.name}.findBranches -- success`);
    return result;
  }
}

export default BranchRepository;
