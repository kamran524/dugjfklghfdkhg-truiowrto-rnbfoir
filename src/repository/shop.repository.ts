import logger from "../log/winston";
import { IShop } from "../models/interfaces/shop.interface";
import {ShopModel} from '../models/shop.model'

class ShopRepository {
  constructor () {}

  public async createShop (query: IShop) {
    logger.debug(`${ShopRepository.name}.createShop -- start`);
    const result = await ShopModel.create(query);
    logger.debug(`${ShopRepository.name}.createShop -- success`);
    return result;
  }

  public async findShopById(id:string){
    logger.debug(`${ShopRepository.name}.findShopById -- start`);
    const result = await ShopModel.findOne({_id:id}).populate("image");
    logger.debug(`${ShopRepository.name}.findShopById -- start`);
    return result;
  }

  public async findShops(){
    logger.debug(`${ShopRepository.name}.findShops -- start`);
    const result = await ShopModel.find().populate("image").lean()
    logger.debug(`${ShopRepository.name}.findShops -- start`);
    return result;
  }


  public async deleteShop(id:string) {
    logger.debug(`${ShopRepository.name}.deleteShop -- start`);
    const result = await ShopModel.updateOne({_id:id},{status:false});
    logger.debug(`${ShopRepository.name}.deleteShop -- start`);
    return result;
  };

  public async updateShop(id: string,query:IShop){
    logger.debug(`${ShopRepository.name}.updateShop -- start`);
    const result = await ShopModel.findByIdAndUpdate({_id:id},{$set:query});
    logger.debug(`${ShopRepository.name}.updateShop -- start`);
    return result;
  }
}

export default ShopRepository;
