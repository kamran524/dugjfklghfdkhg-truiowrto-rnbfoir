import { Request } from "express";
import { ApiError } from "../errors/api.error";
import BranchHelper from "../helper/branch.helper";
import logger from "../log/winston";
import BranchRepository from "../repository/branch.repository";

class BranchService {
  private readonly branchRepository: BranchRepository;

  constructor() {
    this.branchRepository = new BranchRepository();
  }

  public async createBranch(request: Request) {
    logger.debug(`${BranchService.name}.createBranch -- start`);
    const result = await this.branchRepository.createBranch(request.body);
    logger.debug(`${BranchService.name}.createBranch -- success`);
    return result;
  }

  public async updateBranch(request: Request) {
    logger.debug(`${BranchService.name}.updateBranch -- start`);
    const { id } = request.params;
    const result = await this.branchRepository.updateBranchById(
      id,
      request.body
    );
    logger.debug(`${BranchService.name}.updateBranch -- success`);
    return result;
  }

  public async deleteBranch(request: Request) {
    logger.debug(`${BranchService.name}.deleteBranch -- start`);
    const { id } = request.params;
    const result = await this.branchRepository.deleteBranch(id);
    logger.debug(`${BranchService.name}.deleteBranch -- success`);
    return result;
  }

  public async getBranch(request: Request) {
    logger.debug(`${BranchService.name}.getBranch -- start`);
    const { id } = request.params;
    const result = await this.branchRepository.findBranchById(id);
    if (!result) {
      logger.error(`${BranchService.name}.getBranch -- not found`);
      throw ApiError.NotFoundException(`Branch with id ${id} not found!`);
    }
    const data = new BranchHelper(result);
    logger.debug(`${BranchService.name}.getBranch -- success`);
    return data;
  }

  public async getBranches() {
    logger.debug(`${BranchService.name}.getBranches -- start`);
    const result = await this.branchRepository.findBranches();
    if (!result || result.length === 0) {
      logger.error(`${BranchService.name}.getBranches -- not content`);
      throw ApiError.NoContentException("No content found!");
    }
    const data: BranchHelper[] = [];
    for (const key in result) data.push(new BranchHelper(result[key]));
    logger.debug(`${BranchService.name}.getBranches -- success`);
    return data;
  }
}

export default BranchService;
