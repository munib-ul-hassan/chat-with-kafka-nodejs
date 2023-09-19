import { createServer } from "http"; // for local server
import express from "express";
import { Chatouters } from "./Routers/chat.routers.js";
import { connectDB } from "./DB/index.js";
import KafkaConfig from "./Config/kafkaConfig.js";


// import { app } from "./appsub.js";

const app = express()
app.use(express.json())
// import { Server } from "socket.io";
const httpServer = createServer(app); // for local without https
// import { socketEventListner } from "./socketEventListener.js";
// export const io = new Server(httpServer); // for local
const port = process.env.PORT || 8080;
connectDB()
app.get("/", function (req, res) {
    res.json({ status: true, message: "Wellcome to server" })
})
const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("my-topic", (value) => {
  console.log("📨 Receive message: ", value);
});
app.use("/", Chatouters)
// io.addListener("connection", socketEventListner);
httpServer.listen(port, async () => {
    console.log("Server listening on port " + port);
});