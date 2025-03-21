import { Schema, model} from "mongoose";

const categorySchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        unique:true
    },
    description:{
        type: String,
        required: [true, "Description is required"]
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

categorySchema.methods.toJSON = function(){
    const { _id, ...category} = this.toObject()
    category.id = _id
    return category
}


export default model("Category", categorySchema)