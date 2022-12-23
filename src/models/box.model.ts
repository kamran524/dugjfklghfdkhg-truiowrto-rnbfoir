import { model, Schema } from "mongoose";
import { IBox, IBoxModel } from "./interfaces/box.interface";

const boxSchema = new Schema<IBox>(
  {
    barcode: {
      type: String,
      immutable: true,
      unique: true,
      required: true,
    },
    ordersID: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
    ],
    totalWeight: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const BoxModel = model<IBox, IBoxModel>("Box", boxSchema);
