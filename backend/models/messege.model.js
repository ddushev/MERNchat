import { Schema, Types, model } from "mongoose";

const messageSchema = new Schema({
  senderId: { type: Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const Message = model("Message", messageSchema);

export default Message;