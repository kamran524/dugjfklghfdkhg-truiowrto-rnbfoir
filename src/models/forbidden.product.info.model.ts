import { Schema, model } from 'mongoose';
import { IForbiddenProduct, IForbiddenProductModel } from './interfaces/forbidden.product.interface';

const forbiddenProductSchema = new Schema<IForbiddenProduct>(
    {

        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        status:{
            type:Boolean,
            default:false
        }
}
,{timestamps:true}
);

export const ForbiddenProductModel = model<IForbiddenProduct, IForbiddenProductModel>(
    "ForbiddenProduct",
    forbiddenProductSchema
);