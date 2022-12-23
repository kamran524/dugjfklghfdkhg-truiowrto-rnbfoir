import { Schema } from "mongoose";
import { IRole } from "../models/interfaces/role.interface";

export class RoleHelper {
  id: Schema.Types.ObjectId;

  name: string;

  privileges: Schema.Types.ObjectId[];

  status: boolean;

  constructor(model: IRole) {
    this.id = model._id;
    this.name = model.name;
    this.privileges = model.privileges;
    this.status = model.status;
  }
}
