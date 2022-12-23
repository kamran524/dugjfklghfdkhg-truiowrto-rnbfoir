import { Schema } from "mongoose";

export class FaqsHelper {
  id: Schema.Types.ObjectId;
  question: string;
  answer: string;
  status: boolean;

  constructor(model) {
    this.id = model._id;
    this.question = model.question;
    this.answer = model.answer;
    this.status = model.status;
  }
}
