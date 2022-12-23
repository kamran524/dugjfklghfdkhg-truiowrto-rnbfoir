import { Types } from "mongoose";
import logger from "../log/winston";
import { ImageModel } from "../models/image.model";

class ImageRepository {

  constructor () {}

  public async createImage (url: string) {
    logger.debug(`${ImageRepository.name}.createImage -- start`);
    const result = await ImageModel.create({url});
    logger.debug(`${ImageRepository.name}.createImage -- success`);
    return result;
  }

  public async updateImage(image:Types.ObjectId,path:string){
    logger.debug(`${ImageRepository.name}.createImage -- start`);
    
    const result = await ImageModel.findByIdAndUpdate({_id:image._id},{$set:{url:path}});
    logger.debug(`${ImageRepository.name}.createImage -- success`);
    return result
    
  }
}

export default ImageRepository;
