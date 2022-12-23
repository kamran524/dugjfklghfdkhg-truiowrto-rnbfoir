import { constants } from "http2";
import { Request, Response, NextFunction } from 'express';
import logger from '../log/winston';
import ForbiddenProductService from '../services/forbidden.product.info.service'

class ForbiddenProductController {
    private readonly forbiddenProductService: ForbiddenProductService

    constructor() {
        this.forbiddenProductService = new ForbiddenProductService()
    };

    public createContent = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            logger.debug(`${ForbiddenProductController.name}.createContent -- start`);
            const result = await this.forbiddenProductService.createContent(request);
            response.status(constants.HTTP_STATUS_CREATED).send(result)
            logger.debug(`${ForbiddenProductController.name}.createContent -- success`);

        } catch (err) {
            next(err)
        }
    };
    public getContent = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            logger.debug(`${ForbiddenProductController.name}.getContent -- start`);
            const result = await this.forbiddenProductService.getContent(request)
            response.status(constants.HTTP_STATUS_OK).send(result)
            logger.debug(`${ForbiddenProductController.name}.getContent -- start`);
        } catch (err) {
            next(err)
        }
    };

    public getContents = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            logger.debug(`${ForbiddenProductController.name}.getContents -- start`);
            const result = await this.forbiddenProductService.getContents()
            response.status(constants.HTTP_STATUS_OK).send(result)
            logger.debug(`${ForbiddenProductController.name}.getContents -- start`);
        } catch (err) {
            next(err)
        }
    };

    public updateContent = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            logger.debug(`${ForbiddenProductController.name}.updateContent -- start`);
            const result = await this.forbiddenProductService.updateContent(request);
            logger.debug(`${ForbiddenProductController.name}.updateContent -- success`);
            response.status(constants.HTTP_STATUS_OK).send(result);
        } catch (err) {
            next(err)
        }
    };

    public deleteContent = async(
        request: Request,
        response: Response,
        next: NextFunction
    ) =>{
        try{
            logger.debug(`${ForbiddenProductController.name}.deleteContent -- start`);
            const result = await this.forbiddenProductService.deleteContent(request);
            logger.debug(`${ForbiddenProductController.name}.deleteContent -- start`);
            response.status(constants.HTTP_STATUS_OK).send(result);


        }catch(err){
            next(err)
        }
    }
};

export default ForbiddenProductController;
