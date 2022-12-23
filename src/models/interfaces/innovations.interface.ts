import { Model, Schema } from 'mongoose';

export interface IInnovations {
    _id:Schema.Types.ObjectId,
    pageHeader:string,
    pageDescription:string,
    image:string,
    contentHeader:string,
    contentDescription:string
};

export interface IInnovationsModel extends Model<IInnovations>{
    build(args:IInnovations):IInnovations
};