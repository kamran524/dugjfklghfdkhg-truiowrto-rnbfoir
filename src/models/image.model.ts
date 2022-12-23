import {Schema,model} from 'mongoose';
import {Iİmage,IİmageModel} from './interfaces/image.interface';

const imageSchema = new Schema<Iİmage>(
    {
        url:{
            type:String
        }
    },
{
    timestamps:true
}
);


export const ImageModel = model<Iİmage,IİmageModel>(
    "Image",
    imageSchema
);
