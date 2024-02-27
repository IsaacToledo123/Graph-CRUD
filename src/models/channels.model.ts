import { Schema, model } from "mongoose";

const channelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    suscribers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
    ]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Channel = model("Channel", channelSchema, "channel");

export default Channel;
