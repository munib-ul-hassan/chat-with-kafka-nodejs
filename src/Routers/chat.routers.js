import { Router } from "express";
import ChatController from "../Controller/chat.controller.js";

export let Chatouters = Router();
Chatouters.route("/message").post(ChatController.sendMessage);
Chatouters.route("/chat").post(ChatController.createChat);
Chatouters.route("/message/:id").get(ChatController.getMessages);
Chatouters.route("/chat/:id").get(ChatController.getchatRooms);

