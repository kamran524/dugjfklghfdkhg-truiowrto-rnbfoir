import { Request } from "express";
import { ApiError } from "../errors/api.error";
import { FaqsHelper } from "../helper/faqs.helper";
import logger from "../log/winston";
import FaqsRepository from "../repository/faqs.repository";

class FaqsService {
  private readonly faqsRepository: FaqsRepository;
  constructor() {
    this.faqsRepository = new FaqsRepository();
  }

  public async CreateFaq(request: Request) {
    logger.debug(
      `${FaqsService.name}.CreateFaq -- start`
    );
    const result = await this.faqsRepository.CreateFaq(
      request.body
    );
    if (!result) {
      logger.warn(
        `${FaqsService.name}.CreateFaq -- BadRequest`
      );
      throw ApiError.BadRequest();
    }
    logger.debug(
      `${FaqsService.name}.CreateFaq -- success`
    );
    return result;
  }
  public async UpdateFaq(request: Request) {
    logger.debug(`${FaqsService.name}.UpdateFaq -- start`);
    const { id } = request.body;
    const result = await this.faqsRepository.UpdateFaq(request.body,id);
    if(!result.modifiedCount){
        logger.warn(`${FaqsService.name}.UpdateFaq -- BadRequest`);
        throw ApiError.BadRequest();
    }
    logger.debug(`${FaqsService.name}.UpdateFaq -- start`);
    return result;
  }
  public async DeleteFaq(request:Request){
    logger.debug(`${FaqsService.name}.DeleteFaq -- start`);
    const {id} = request.params;
    const result = await this.faqsRepository.DeleteFaq(id);
    if(!result.modifiedCount){
        logger.warn(`${FaqsService.name}.DeleteFaq -- BadRequest`);
        throw ApiError.BadRequest();
    }
    logger.debug(`${FaqsService.name}.DeleteFaq -- success`);
    return result;
  }
  public async GetFaqs(){
    logger.debug(`${FaqsService.name}.GetFaqs -- start`);
    const result = await this.faqsRepository.GetFaqs();
    if(!result.length){
        logger.warn(`${FaqsService.name}.GetFaqs -- NoContentException`);
        throw ApiError.NoContentException();
    }
    let data:FaqsHelper[] = [];
    for(const key in result){
        data.push(new FaqsHelper(result[key]));
    }
    logger.debug(`${FaqsService.name}.GetFaqs -- success`);
    return data;
  }
  public async GetFaqById(request:Request){
    logger.debug(`${FaqsService.name}.GetFaqById -- start`);
    const {id} = request.params;
    const result = await this.faqsRepository.GetFaqById(id);
    if(!result){
        logger.warn(`${FaqsService.name}.GetFaqById -- NotFoundException`);
        throw ApiError.NotFoundException();
    }
    const data = new FaqsHelper(result);
    logger.debug(`${FaqsService.name}.GetFaqById -- success`);
    return data;
  }
}

export default FaqsService;
