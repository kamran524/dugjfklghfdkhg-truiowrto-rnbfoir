import { model, Schema } from "mongoose";
import { IToken, ITokenModel } from "./interfaces/token.interface";

const TokenSchema = new Schema<IToken>(
  {
    customerID: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const TokenModel = model<IToken, ITokenModel>(
  "Token",
  TokenSchema
);
