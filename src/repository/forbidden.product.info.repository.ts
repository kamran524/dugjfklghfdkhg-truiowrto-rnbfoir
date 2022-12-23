import logger from '../log/winston';
import { ForbiddenProductModel } from '../models/forbidden.product.info.model'
import { IForbiddenProduct } from '../models/interfaces/forbidden.product.interface'


class ForbiddenProductRepository {
    constructor() { }

    public async createContent(query: IForbiddenProduct) {
        try {
            logger.debug(`${ForbiddenProductRepository.name}.createContent -- start`);
            const result = await ForbiddenProductModel.create(query)
            console.log('repo:', result);

            logger.debug(`${ForbiddenProductRepository.name}.createContent -- success`);
            return result
        } catch (err) {
            console.log(err);

        }
    };

    public async getContent(id: string) {
        logger.debug(`${ForbiddenProductRepository.name}.getContent -- start`);
        const result = await ForbiddenProductModel.findOne({ _id: id });
        logger.debug(`${ForbiddenProductRepository.name}.getContent -- success`);
        return result;
    };

    public async getContents() {
        logger.debug(`${ForbiddenProductRepository.name}.getContents -- start`);
        const result = await ForbiddenProductModel.find();
        logger.debug(`${ForbiddenProductRepository.name}.getContents -- success`);
        return result;
    }
    public async updateContent(id: string, query: IForbiddenProduct) {
        logger.debug(`${ForbiddenProductRepository.name}.updateContent -- start`);
        const result = await ForbiddenProductModel.findByIdAndUpdate({ _id: id }, { $set: query })
        logger.debug(`${ForbiddenProductRepository.name}.updateContent -- success`);
        return result;
    };

    public async deleteContent(id: string) {
        logger.debug(`${ForbiddenProductRepository.name}.deleteContent -- start`);
        const result = await ForbiddenProductModel.updateOne({ _id: id }, { status: false });
        logger.debug(`${ForbiddenProductRepository.name}.deleteContent -- success`);
        return result
    }
};


export default ForbiddenProductRepository;