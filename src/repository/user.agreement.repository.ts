import logger from "../log/winston";
import { UserAgreementModel } from "../models/user.agreement.model";
import { IUserAgreement } from "../models/interfaces/user.agreement.interface";


class UserAgreementRepository{
    constructor() {}
    public async CreateUserAgreement(data:IUserAgreement){
        logger.debug(`${UserAgreementRepository.name}.CreateUserAgreement -- start`);
        const result = await UserAgreementModel.create(data);
        logger.debug(`${UserAgreementRepository.name}.CreatePrivactPolicy -- success`);
        return result;
    }
    public async UpdateUserAgreement(id:string, data:IUserAgreement){
        logger.debug(`${UserAgreementRepository.name}.UpdateUserAgreement -- start`);
        const result = await UserAgreementModel.updateOne({_id:id},data);
        logger.debug(`${UserAgreementRepository.name}.UpdateUserAgreement -- success`);
        return result;
    }
    public async DeleteUserAgreement(id:string){
        logger.debug(`${UserAgreementRepository.name}.DeleteUserAgreement -- start`);
        const result = await UserAgreementModel.updateOne({_id:id},{status:false});
        logger.debug(`${UserAgreementRepository.name}.DeleteUserAgreement -- success`);
        return result;
    }
    public async GetUserAgreements(){
        logger.debug(`${UserAgreementRepository.name}.GetUserAgreements -- start`);
        const result = await UserAgreementModel.find();
        logger.debug(`${UserAgreementRepository.name}.GetUserAgreements -- success`);
        return result;
    }
    public async GetUserAgreementById(id:string){
        logger.debug(`${UserAgreementRepository.name}.GetUserAgreementById -- start`);
        const result = await UserAgreementModel.findById(id);
        logger.debug(`${UserAgreementRepository.name}.GetUserAgreementById -- success`);
        return result;
    }
}

export default UserAgreementRepository;