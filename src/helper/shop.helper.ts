import { Schema, Types } from "mongoose";
import { IShop } from "../models/interfaces/shop.interface";

export class ShopHelper{
    id:Schema.Types.ObjectId
    productCategory:string
    title:string
    image:Types.ObjectId[]

    constructor(model: IShop){
        this.id = model._id
        this.productCategory = model.productCategory
        this.title = model.title
        this.image = model.image
    }
}; 