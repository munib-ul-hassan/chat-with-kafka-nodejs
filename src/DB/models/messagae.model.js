import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    chatRoomId:{
        type:Schema.Types.ObjectId,
        ref:"chatRoom"
    },
    message:{
        type:String
    },
    sender:{ 
        type:String
    },
    viewers:[{
        type:String
    }]
},{timestamps:true})

const messageModel = model("message", messageSchema);
export default messageModel