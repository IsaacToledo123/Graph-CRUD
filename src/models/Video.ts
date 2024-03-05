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
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
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