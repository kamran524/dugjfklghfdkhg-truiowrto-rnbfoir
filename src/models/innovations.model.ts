import { Schema, model } from 'mongoose';
import {IInnovations,IInnovationsModel} from './interfaces/innovations.interface'


const innovationsSchema = new Schema<IInnovations>(
    {
        pageHeader:{
            type:String,
            required:true
        },
        pageDescription:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        contentHeader:{
            type:String,
            required:true
        },
        contentDescription:{
            type:String,
            required:true
        }
    },
    {timestamps:true}
);


export const InnovationsModel = model<IInnovations,IInnovationsModel>(
    "Innovations",
    innovationsSchema
)