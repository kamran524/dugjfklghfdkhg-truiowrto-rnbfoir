import { Request } from "express";
import { ApiError } from "../errors/api.error";
import { UserAgreementHelper } from "../helper/user.agreement.helper";
import logger from "../log/winston";
import UserAgreementRepository from "../repository/user.agreement.repository";

class UserAgreementService{
    private readonly userAgreementRepository:UserAgreementRepository;
    constructor(){
        this.userAgreementRepository = new UserAgreementRepository();
    }
    public async CreateUserAgreement(request:Request){
        logger.debug(`${UserAgreementService.name}.CreateUserAgreement -- start`);
        const result = await this.userAgreementRepository.CreateUserAgreement(request.body);
        if(!result){
            logger.warn(`${UserAgreementService.name}.CreateUserAgreement -- BadRequest`);
            throw ApiError.BadRequest("User agreement not found");
        }
        logger.debug(`${UserAgreementService.name}.CreateUserAgreement -- success`);
        return result;
    }
    public async UpdateUserAgreement(request:Request){
        logger.debug(`${UserAgreementService.name}.UpdateUserAgreement -- start`);
        const {id} = request.body;
        const result = await this.userAgreementRepository.UpdateUserAgreement(id,request.body);
        if(!result.matchedCount){
            logger.warn(`${UserAgreementService.name}.UpdateUserAgreement -- BadRequest`);
            throw ApiError.BadRequest(`User agreement with id ${id} not found!`);
        }
        else if (!result.modifiedCount) {
            logger.error(`${UserAgreementService.name}.UpdateUserAgreement -- not updated`);
            throw ApiError.ServiceUnavailableException("User agreement could not be updated!");
          }
        logger.debug(`${UserAgreementService.name}.UpdateUserAgreement -- success`);
        return result;
    }
    public async DeleteUserAgreement(request:Request){
        logger.debug(`${UserAgreementService.name}.DeleteUserAgreement -- start`);
        const {id} = request.params;
        const result = await this.userAgreementRepository.DeleteUserAgreement(id);
        if (!result.matchedCount){
            logger.warn(`${UserAgreementService.name}.DeleteUserAgreement -- NotFoundException`);
            throw ApiError.NotFoundException(`User agreement with id ${id} not found!`);
          } else if (!result.modifiedCount){
        logger.warn(`${UserAgreementService.name}.DeleteUserAgreement -- GeneralException`);
        throw ApiError.GeneralException(`User agreement could not be deleted!`);
      }
        logger.debug(`${UserAgreementService.name}.DeleteUserAgreement -- success`);
        return result;
    }
    public async GetUserAgreementById(request:Request){
        logger.debug(`${UserAgreementService.name}.GetUserAgreementById -- start`);
        const {id} = request.body;
        const result = await this.userAgreementRepository.GetUserAgreementById(id);
        if(!result){
            logger.warn(`${UserAgreementService.name}.GetUserAgreementById -- NotFoundException`);
            throw ApiError.NotFoundException(`User agreement with id ${id} not found!`);
        }
        const data = new UserAgreementHelper(result);
        logger.debug(`${UserAgreementService.name}.GetUserAgreementById -- success`);
        return data;
    }
    public async GetUserAgreements(){
        logger.debug(`${UserAgreementService.name}.GetUserAgreements -- start`);
        const result = await this.userAgreementRepository.GetUserAgreements();
        if(!result || result.length === 0){
            logger.warn(`${UserAgreementService.name}.GetUserAgreements -- NoContentException`);
            throw ApiError.NoContentException("No tariff found!");
        }
        let data:UserAgreementHelper[]=[];
        for(const key in result){
            data.push(new UserAgreementHelper(result[key]));
        }
        logger.debug(`${UserAgreementService.name}.GetUserAgreements -- success`);
        return data;
    }
}

export default UserAgreementService;
