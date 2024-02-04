import { Schema, model } from "mongoose";
import { iVoice, iVoiceData } from "../utils/interfaces";
import { Food } from "../utils/enums";

const voiceModel = new Schema<iVoiceData>(
  {
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    email: {
      type: [String],
      required: true,
      unique: true,
    },
    status: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<iVoiceData>("user", voiceModel);
