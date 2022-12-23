import { Request } from "express";
import { ApiError } from "../errors/api.error";
import { PrivacyPolicyHelper } from "../helper/privacy.policy.helper";
import logger from "../log/winston";
import PrivacyPolicyRepository from "../repository/privacy.policy.repository";

class PrivacyPolicyService{
    private readonly privacyPolicyRepository:PrivacyPolicyRepository;
    constructor(){
        this.privacyPolicyRepository = new PrivacyPolicyRepository();
    }
    public async CreatePrivacyPolicy(request:Request){
        logger.debug(`${PrivacyPolicyService.name}.CreatePrivacyPolicy -- start`);
        const result = await this.privacyPolicyRepository.CreatePrivacyPolicy(request.body);
        if(!result){
            logger.warn(`${PrivacyPolicyService.name}.CreatePrivacyPolicy -- BadRequest`);
            throw ApiError.BadRequest();
        }
        logger.debug(`${PrivacyPolicyService.name}.CreatePrivacyPolicy -- success`);
        return result;
    }
    public async UpdatePrivacyPolicy(request:Request){
        logger.debug(`${PrivacyPolicyService.name}.UpdatePrivacyPolicy -- start`);
        const {id} = request.body;
        const result = await this.privacyPolicyRepository.UpdatePrivacyPolicy(id,request.body);
        if(!result.modifiedCount){
            logger.warn(`${PrivacyPolicyService.name}.UpdatePrivacyPolicy -- BadRequest`);
            throw ApiError.BadRequest();
        }
        logger.debug(`${PrivacyPolicyService.name}.UpdatePrivacyPolicy -- success`);
        return result;
    }
    public async DeletePrivacyPolicy(request:Request){
        logger.debug(`${PrivacyPolicyService.name}.DeletePrivacyPolicy -- start`);
        const {id} = request.body;
        const result = await this.privacyPolicyRepository.DeletePrivacyPolicy(id);
        if(!result.modifiedCount){
            logger.warn(`${PrivacyPolicyService.name}.DeletePrivacyPolicy -- BadRequest`);
            throw ApiError.BadRequest();
        }
        logger.debug(`${PrivacyPolicyService.name}.DeletePrivacyPolicy -- success`);
        return result;
    }
    public async GetPrivacyPolicyById(request:Request){
        logger.debug(`${PrivacyPolicyService.name}.GetPrivacyPolicyById -- start`);
        const {id} = request.body;
        const result = await this.privacyPolicyRepository.GetPrivacyPolicyById(id);
        if(!result){
            logger.warn(`${PrivacyPolicyService.name}.GetPrivacyPolicyById -- NotFoundException`);
            throw ApiError.NotFoundException();
        }
        const data = new PrivacyPolicyHelper(result);
        logger.debug(`${PrivacyPolicyService.name}.GetPrivacyPolicyById -- success`);
        return data;
    }
    public async GetPrivacyPolicies(){
        logger.debug(`${PrivacyPolicyService.name}.GetPrivacyPolicies -- start`);
        const result = await this.privacyPolicyRepository.GetPrivacyPolicies();
        if(!result){
            logger.warn(`${PrivacyPolicyService.name}.GetPrivacyPolicies -- NoContentException`);
            throw ApiError.NoContentException();
        }
        let data:PrivacyPolicyHelper[]=[];
        for(const key in result){
            data.push(new PrivacyPolicyHelper(result[key]));
        }
        logger.debug(`${PrivacyPolicyService.name}.GetPrivacyPolicies -- success`);
        return data;
    }
}

export default PrivacyPolicyService;