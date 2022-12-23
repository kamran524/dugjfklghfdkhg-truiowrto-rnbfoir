import { Model, Schema } from "mongoose";

export interface IToken {
  customerID: Schema.Types.ObjectId;
  token: String;
}

export interface ITokenModel extends Model<IToken> {
  build(args: IToken): IToken;
}
