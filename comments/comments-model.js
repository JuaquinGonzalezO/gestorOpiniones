import { Schema, model } from "mongoose";

const CommentSchema = Schema(
    
        {
            username: {
                type: String,
                required: [true, "Holder username required."]
            },
            email: {
                type: String,
                required: [true, "Holder email required."]
            },
            text: {
                type: String,
                required: [true, "text is required"],
                maxLength: [2500, "Cant be overcome 1500 characters"]
            },
            holder: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required : [true, "User required"]
            },
            post: {
                type: Schema.Types.ObjectId,
                ref: 'post',
                required : [true, "Post required"]
            },
            condition: {
                type: Boolean,
                default: true,
            }
        },
        {
            timestamps: true,
            versionKey: false
        }
    )

export default model('Comment', CommentSchema);