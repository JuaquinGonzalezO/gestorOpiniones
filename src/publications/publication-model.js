import { Schema, model } from "mongoose";

const PublicationSchema = Schema(
    {
    
        title: {
            type: String,
            required: [true, "title is required"],
            maxLength: [2000, "Cant be overcome 25 characters"]
        },
        text: {
            type: String,
            required: [true, "text is required"],
            maxLength: [2000, "Cant be overcome 25 characters"]
        },

        category:{
            type:String,
            requirec: true

        },
        status:{
            type : Boolean,
            default: true
        },


        user: {
            type: Schema.Types.ObjectId,
            ref:"user",
            default: true
        },

    },
    {
        timestamps: true,
        versionKey: false
    }
);



export default model('Publication', PublicationSchema);