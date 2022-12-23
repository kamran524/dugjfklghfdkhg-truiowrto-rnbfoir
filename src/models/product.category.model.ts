import { model, Schema } from "mongoose";
import { IProductCategory, IProductCategoryModel } from "./interfaces/product.category.interface";

const productCategorySchema = new Schema<IProductCategory>(
  {
    category: {
      type: String,
      unique: true,
      required: true,
    },
    status:{
        type: Boolean,
        default: true
    }
  },
  { timestamps: true }
);

export const ProductCategoryModel = model<IProductCategory, IProductCategoryModel>("ProductCategory", productCategorySchema);
