import { Schema, model } from "mongoose";

const chatRoomSchema = new Schema({
    users: [
        {
            type: String
        }
    ],
    owner: {

        type: String
    },
    admins: [{
        type: String

    }],

}, { timestamps: true })

const chatRoomModel = model("chatRoom", chatRoomSchema);
export default chatRoomModel