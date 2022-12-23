import { Schema, model } from "mongoose";
import { ENUMS } from "../enum/enums";
import { ITariff, ITariffModel } from "./interfaces/tariff.interface";

const tariffSchema = new Schema<ITariff>({
  minWeight: {
    type: Number,
    required: true,
  },
  maxWeight: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ENUMS.TARIFF_TYPE,
    required: true,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });


export const TariffModel = model<ITariff, ITariffModel>("Tariff", tariffSchema);
