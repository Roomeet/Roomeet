const router = require("express").Router();
import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import ChatRoom from '../models/ChatRoom';
const chatroomController = require("../controllers/chatroomController");

router.get("/chatrooms/:userId", async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const allChatRooms = await ChatRoom.find({ participants: userId });    
    res.status(200).send(allChatRooms);
});

router.get("/chatroom/:chatRoomId", async (req: Request, res: Response) => {
    const chatRoomId = req.params.chatRoomId;
    const chatroom = await ChatRoom.findById(chatRoomId);
    res.status(200).send(chatroom);
});

router.get("/chatroom/participants/:participants", async (req: Request, res: Response) => {
    const participants = req.params.participants.split('and')   
    const chatroom = await ChatRoom.find({participants: {$all: [...participants]}});
    res.status(200).send(chatroom);
});

router.post("/chatroom", (req :Request, res: Response) => {chatroomController.createChatroom});

module.exports = router;