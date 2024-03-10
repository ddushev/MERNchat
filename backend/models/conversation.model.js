import { Schema, model, Types } from "mongoose";

const conversationSchema = new Schema({
  participants: [{ type: Types.ObjectId, ref: "User" }],
  messages: [{ type: Types.ObjectId, ref: "Message", default: [] }],
}, { timestamps: true });

const Conversation = model("Conversation", conversationSchema);

export default Conversation;