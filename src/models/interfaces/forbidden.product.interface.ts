import { Model, Schema } from 'mongoose';

export interface IForbiddenProduct {
    title:string,
    description:string
    content:string,
    status:boolean
};

export interface IForbiddenProductModel extends Model<IForbiddenProduct>{
    build(args: IForbiddenProduct):IForbiddenProduct
}