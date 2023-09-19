import KafkaConfig from "../Config/kafkaConfig.js"
import chatRoomModel from "../DB/models/chatRoom.model.js"
import messageModel from "../DB/models/messagae.model.js"

const sendMessage = async (req, res) => {
    try {
        const kafkaconfig = new KafkaConfig()
        kafkaconfig.produce("my-topic", [
            { key: "key1", value: req.body.message }
        ])
        const chat = new messageModel(req.body)
        await chat.save()
        res.status(200).json({ data: chat, status: true, message: "Message send successfully" })

    } catch (err) {
        res.status(400).json({ status: false, message: err.message })

    }
}
const createChat = async (req, res) => {
    try {
        console.log(req.body)
        const chat = new chatRoomModel(req.body)
        await chat.save()
        res.status(200).json({ data: chat, status: true, message: "Chat created successfully" })

    } catch (err) {
        res.status(400).json({ status: false, message: err.message })

    }

}

const getchatRooms = async (req, res) => {
    try {
        const { id } = req.params
        const data = await chatRoomModel.find({ users: { $in: id } })
        res.status(200).json({ data, status: true, message: "Meesages get successfully" })
    } catch (err) {
        res.status(400).json({ status: false, message: err.message })

    }

}
const getMessages = async (req, res) => {
    try {
        const { id } = req.params
        const data = await messageModel.find({ chatRoomId: id })
        res.status(200).json({ data, status: true, message: "Meesages get successfully" })

    } catch (err) {
        res.status(400).json({ status: false, message: err.message })

    }

}
const ChatController = {
    sendMessage,
    createChat,
    getchatRooms,
    getMessages
}
export default ChatController