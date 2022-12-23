import { Schema, Model } from "mongoose";
import { ENUMS } from "../../enum/enums";

export interface ITariff {
  _id?: Schema.Types.ObjectId;
  minWeight: number;
  maxWeight: number;
  volume: number;
  price: number;
  type: typeof ENUMS.TARIFF_TYPE;
  country: Schema.Types.ObjectId;
  status?: boolean;
}

export interface ITariffModel extends Model<ITariff> {
  build(args: ITariff): ITariff;
}
