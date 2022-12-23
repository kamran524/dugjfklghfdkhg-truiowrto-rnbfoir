import { Schema } from "mongoose";

export class ProductCategoryHelper{
    id:Schema.Types.ObjectId;
    category:string;

    constructor(model){
        this.id = model._id;
        this.category = model.category;
    }
}