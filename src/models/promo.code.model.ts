import { model, Schema } from "mongoose";
import { IPromoCode, IPromoCodeModel } from "./interfaces/promocode.interface";

const PromoCodeSchema = new Schema<IPromoCode>(
  {
    code: {
        type: String,
        unique: true,
        required: true,
      },
    campaignID: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
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

export const PromoCodeModel = model<IPromoCode, IPromoCodeModel>("PromoCode", PromoCodeSchema);
