import logger from "../log/winston";
import { PrivacyPolicyModel } from "../models/privacy.policy.model";
import { IPrivacyPolicy } from "../models/interfaces/privacy.policy.interface";


class PrivacyPolicyRepository{
    constructor() {}
    public async CreatePrivacyPolicy(data:IPrivacyPolicy){
        logger.debug(`${PrivacyPolicyRepository.name}.CreatePrivacyPolicy -- start`);
        const result = await PrivacyPolicyModel.create(data);
        logger.debug(`${PrivacyPolicyRepository.name}.CreatePrivactPolicy -- success`);
        return result;
    }
    public async UpdatePrivacyPolicy(id:string, data:IPrivacyPolicy){
        logger.debug(`${PrivacyPolicyRepository.name}.UpdatePrivacyPolicy -- start`);
        const result = await PrivacyPolicyModel.updateOne({_id:id},data);
        logger.debug(`${PrivacyPolicyRepository.name}.UpdatePrivacyPolicy -- success`);
        return result;
    }
    public async DeletePrivacyPolicy(id:string){
        logger.debug(`${PrivacyPolicyRepository.name}.DeletePrivacyPolicy -- start`);
        const result = await PrivacyPolicyModel.updateOne({_id:id},{status:false});
        logger.debug(`${PrivacyPolicyRepository.name}.DeletePrivacyPolicy -- success`);
        return result;
    }
    public async GetPrivacyPolicies(){
        logger.debug(`${PrivacyPolicyRepository.name}.GetPrivacyPolicies -- start`);
        const result = await PrivacyPolicyModel.find();
        logger.debug(`${PrivacyPolicyRepository.name}.GetPrivacyPolicies -- success`);
        return result;
    }
    public async GetPrivacyPolicyById(id:string){
        logger.debug(`${PrivacyPolicyRepository.name}.GetPrivacyPolicyById -- start`);
        const result = await PrivacyPolicyModel.findById(id);
        logger.debug(`${PrivacyPolicyRepository.name}.GetPrivacyPolicyById -- success`);
        return result;
    }
}

export default PrivacyPolicyRepository;