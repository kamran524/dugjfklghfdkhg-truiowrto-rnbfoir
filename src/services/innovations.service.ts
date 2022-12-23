import { ApiError } from '../errors/api.error';
import logger from '../log/winston';
import InnovationsRepository from '../repository/innovations.repository';
import { Multer } from "../config/multer.config";
import { Types } from "mongoose";
import { Request } from 'express'
class InnovationsService {
    private readonly innovationsRepository: InnovationsRepository;

    constructor() {
        this.innovationsRepository = new InnovationsRepository();
    };

    public async createInnovations(request: Request) {
        logger.debug(`${InnovationsService.name}.createInnovations -- start`);
        if(!request.file?.filename){
            logger.warn(`${InnovationsService.name}.createInnovations -- BadRequest`);
            throw ApiError.BadRequest("File not found.");
        }
    }
};

export default InnovationsService;