import { Request, Response, NextFunction } from "express";
import logger from "../log/winston";
import { constants } from "http2";
import { Multer } from "../config/multer.config";
import InnovationsService from '../services/innovations.service'


class InnovationsController {
    private readonly innovationsService: InnovationsService

    constructor() {
        this.innovationsService = new InnovationsService()
    };

    public createInnovations = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            logger.debug(`${InnovationsController.name}.createInnovations -- start`);
            const result = await this.innovationsService.createInnovations(request)
            logger.debug(`${InnovationsController.name}.createInnovations -- start`);
            response.status(constants.HTTP_STATUS_CREATED).send(result)
        } catch (err) {
            if(request.file) await new Multer().removeFile(request.file);
            next(err)
        }
    }

}