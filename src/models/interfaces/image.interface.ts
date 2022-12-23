import { Model, Schema } from "mongoose";


export interface Iİmage {
    url:string
};


export interface IİmageModel extends Model<Iİmage>{
    build(args: Iİmage):Iİmage
};