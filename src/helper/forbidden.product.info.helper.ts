import {Schema} from 'mongoose';
import {IForbiddenProduct} from '../models/interfaces/forbidden.product.interface';

export class ForbiddenProductHelper {
    title:string
    description:string
    content:string
    status:boolean

    constructor(model:IForbiddenProduct){
        this.title = model.title
        this.description = model.description
        this.content = model.content
        this.status = model.status
    }
}