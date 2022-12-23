import ShopRepository from "../repository/shop.repository";
import { Request } from "express";
import logger from "../log/winston";
import envConfig from "../config/env.config";
import { ApiError } from "../errors/api.error";
import ImageRepository from "../repository/image.repository";
import { ShopHelper } from "../helper/shop.helper";
import { Multer } from "../config/multer.config";
import { Types } from "mongoose";

class ShopService {

  private readonly shopRepository: ShopRepository;
  private readonly imageRepository: ImageRepository;
  constructor () {
    this.shopRepository = new ShopRepository();
    this.imageRepository = new ImageRepository();
  }

  public async createShop (request: Request) {
    logger.debug(`${ShopService.name}.createShop -- start`);
    if (!request.file?.filename) {
      logger.warn(`${ShopService.name}.createShop -- BadRequest`);
      throw ApiError.BadRequest("File not found.");
    }
    let imageArr: Types.ObjectId[] = [];
    console.log("file:", request.file);

    let path = envConfig.URL + "public/" + request.file.filename;
    const image = await this.imageRepository.createImage(path);
    if (!image) {
      throw ApiError.BadRequest("error");
    }
    imageArr.push(image._id);
    request.body.image = imageArr;

    const result = await this.shopRepository.createShop(request.body);
    return result;
  }

  public async getShop (request: Request) {
    logger.debug(`${ShopService.name}.getShop -- start`);
    const { id } = request.params;
    const result = await this.shopRepository.findShopById(id);
    
    if (!result) {
      logger.warn(`${ShopService.name}.getShop -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${ShopService.name}.getShop -- success`);
    const data = new ShopHelper(result)
    return data;
  }

  public async getShops () {
    logger.debug(`${ShopService.name}.getShop -- start`);
    const result = await this.shopRepository.findShops();

    if (!result) {
      logger.warn(`${ShopService.name}.getShop -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    let data: ShopHelper[] = [];

    for(const key in ShopHelper){data.push(new ShopHelper(result[key]))};
    logger.debug(`${ShopService.name}.getShop -- success`);

    return data;
  }

  public async deleteShop (request: Request) {
    logger.debug(`${ShopService.name}.deleteShop -- start`);
    const { id } = request.params;

    const result = await this.shopRepository.deleteShop(id);

    if (!result.modifiedCount) {
      logger.warn(`${ShopService.name}.deleteCountry -- GeneralException`);
      throw ApiError.GeneralException();
    }

    if (!result.matchedCount) {
      logger.warn(`${ShopService.name}.deleteCountry -- NotFoundException`);
      throw ApiError.NotFoundException();
    }
    logger.debug(`${ShopService.name}.deleteShop -- success`);
    return result;
  }


  public async updateShop(request: Request) {
    logger.debug(`${ShopService.name}.deleteShop -- start`);
    const { id } = request.body;
    if (!id) {
      logger.warn(`${ShopService.name}.updateShop -- BadRequest`);
      throw ApiError.BadRequest();
    };
    delete request.body.id;   
    let imageArr: Types.ObjectId[] = [];
    
    if (request.file?.filename) {
      const shop = await this.shopRepository.findShopById(id);
      let path = envConfig.URL + "public/" + request.file.filename;
      const image = await this.imageRepository.updateImage(shop.image[0],path);      
      await new Multer().removeFile(image.url.toString().split("/")[4] as unknown as Express.Multer.File)      
      imageArr.push(image._id);
      request.body.image = imageArr;
    }    
    
    const result = await this.shopRepository.updateShop(id,request.body)
    return result;
  }
}

export default ShopService;
