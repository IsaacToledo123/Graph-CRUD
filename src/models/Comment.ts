import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        body: {
            type: String,
            required: true,
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    }
);

const Comment = model('Comment', commentSchema, 'comments');
export default Comment;