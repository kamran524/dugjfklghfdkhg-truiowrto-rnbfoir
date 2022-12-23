import { Schema } from "mongoose";
import { ITariff } from "../models/interfaces/tariff.interface";
import { ENUMS } from "../enum/enums";

class TariffHelper {
  id: Schema.Types.ObjectId;
  minWeight: number;
  maxWeight: number;
  volume: number;
  price: number;
  type: typeof ENUMS.TARIFF_TYPE;
  country: Schema.Types.ObjectId;

  constructor(model: ITariff) {
    this.id = model._id;
    this.minWeight = model.minWeight;
    this.maxWeight = model.maxWeight;
    this.volume = model.volume;
    this.price = model.price;
    this.type = model.type;
    this.country = model.country;
  }
}

export default TariffHelper;
