import ForbiddenProductRepository from '../repository/forbidden.product.info.repository';
import { Request } from 'express'
import logger from '../log/winston';
import { ApiError } from '../errors/api.error';
import { isEmptyArray } from "../util/array.util";
import {ForbiddenProductHelper} from '../helper/forbidden.product.info.helper'

class ForbiddenProductService {
    private readonly forbiddenProductRepository: ForbiddenProductRepository

    constructor() {
        this.forbiddenProductRepository = new ForbiddenProductRepository()
    };

    public async createContent(request: Request) {
        logger.debug(`${ForbiddenProductService.name}.createContent -- start`);
        console.log('Body:',request.body);
        const result = await this.forbiddenProductRepository.createContent(request.body)
        if(!result){
            throw ApiError.BadRequest()
        }
        
        logger.debug(`${ForbiddenProductService.name}.createContent -- success`);
        return result
    };

    public async getContent(request: Request) {
        logger.debug(`${ForbiddenProductService.name}.getContent -- start`);
        const { id } = request.params
        const result = await this.forbiddenProductRepository.getContent(id)
        if (!result) {
            logger.warn(`${ForbiddenProductService.name}.getContent -- NotFoundException`);
            throw ApiError.NotFoundException();
        };
        const data = new ForbiddenProductHelper(result)
        logger.debug(`${ForbiddenProductService.name}.getContent -- success`);
        return data;
    };

    public async getContents() {
        logger.debug(`${ForbiddenProductService.name}.getContent -- start`);
        const result = await this.forbiddenProductRepository.getContents()
        if (!isEmptyArray(result)) {
            logger.warn(`${ForbiddenProductService.name}.getContents -- NoContentException`);
            throw ApiError.NoContentException();
        }

        let data:ForbiddenProductHelper[] = [];
        for(const key in result) {data.push(new ForbiddenProductHelper(result[key]))}

        logger.debug(`${ForbiddenProductService.name}.getContent -- success`);
        return data;
    };


    public async updateContent(request: Request) {
        logger.debug(`${ForbiddenProductService.name}.updateContent -- start`);
        const { id } = request.body;
        if (!id) {
            logger.warn(`${ForbiddenProductService.name}.updateContent -- BadRequest`);
            throw ApiError.BadRequest();
        }
        delete request.body.id;
        const result = await this.forbiddenProductRepository.updateContent(id, request.body);
        if (!result) {
            logger.warn(`${ForbiddenProductService.name}.updateCountry -- NotFoundException`);
            throw ApiError.NotFoundException();
        }
        logger.debug(`${ForbiddenProductService.name}.updateContent -- success`);
        return result;
    };

    public async deleteContent(request:Request) {
        logger.debug(`${ForbiddenProductService.name}.updateContent -- start`);
        const {id} = request.params;
        const result = await this.forbiddenProductRepository.deleteContent(id);
        if (!result.modifiedCount){
          logger.warn(`${ForbiddenProductService.name}.deleteContent -- GeneralException`);
          throw ApiError.GeneralException();
        }
        if (!result.matchedCount){
          logger.warn(`${ForbiddenProductService.name}.deleteContent -- NotFoundException`);
          throw ApiError.NotFoundException();
        };
        logger.debug(`${ForbiddenProductService.name}.updateContent -- start`);
        return result;
    }
};

export default ForbiddenProductService;