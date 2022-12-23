import { Model, Types, Schema } from "mongoose";

export interface IShop {
    _id:Schema.Types.ObjectId,
    productCategory:string,
    title:string,
    content:string,
    image:Types.ObjectId[],
    isPartner:boolean,
    status:boolean
};

export interface IShopModel extends Model<IShop>{
    build(args:IShop):IShop
};