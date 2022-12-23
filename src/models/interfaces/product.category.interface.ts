import { Model, Schema } from "mongoose";

export interface IProductCategory {
    category:String,
    status:boolean
}

export interface IProductCategoryModel extends Model<IProductCategory> {
  build(args: IProductCategory): IProductCategory;
}
