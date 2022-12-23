import { Schema, model } from "mongoose";
import {IShop,IShopModel} from './interfaces/shop.interface'

const shopSchema = new Schema<IShop>(
   {
       productCategory:{
           type:String,
           ref:"ProductCategory",
           required:true
       },
       title:{
           type:String,
           required:true
       },
       image:[
           {
               type:Schema.Types.ObjectId,ref:"Image"
           }
       ],
       isPartner:{
           type:Boolean,
           default:true
       },
       status:{
           type:Boolean,
           default:true
       }
   },
   {timestamps:true}
)

export const ShopModel = model<IShop, IShopModel>(
   "Shop",
   shopSchema
);

