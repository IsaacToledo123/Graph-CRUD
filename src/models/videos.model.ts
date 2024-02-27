import { Schema, model } from "mongoose";

const videoSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      likes: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      dislikes: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      timestamps: true,
      versionKey: false,
    }
);

const Video = model("Video", videoSchema, "videos");

export default Video;