import { model, Schema } from "mongoose";
import { ICampaign, ICampaignModel } from "./interfaces/campaign.interface";

const campaignSchema = new Schema<ICampaign>(
  {
    name: {
      type: String,
      required: true,
    },
    tariffID: {
      type: Schema.Types.ObjectId,
      ref: "Tariff",
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isFixOrPerson: {
      type: Boolean,
      required: true,
    }
  },
  { timestamps: true }
);

export const CampaignModel = model<ICampaign, ICampaignModel>(
  "Campaign",
  campaignSchema
);
