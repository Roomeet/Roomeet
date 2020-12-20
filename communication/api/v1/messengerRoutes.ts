import { Request, Response } from 'express';
const router = require("express").Router();
const chatroomController = require("../../controllers/chatroomControllers");


// Chatroom routes

// GET All Chatrooms
router.get("/chatrooms", async (req: Request, res: Response) => {chatroomController.getAllChatRooms(req,res)});

// GET all chatrooms for user
router.get("/chatrooms/user/:userId", async (req: Request, res: Response) => {chatroomController.getAllchatRoomsByUserId(req,res)});

// DELETE all chatrooms
router.get("/chatrooms/delete", async (req: Request, res: Response) => {chatroomController.deleteAllChatrooms(req,res)});

// Messages Routes:
router.get("/messages/chatroom/:chatroomId",async (req: Request, res: Response) => {chatroomController.getAllMessagesforChatRoomById(req,res)})

router.get("/messages/delete",async (req: Request, res: Response) => {chatroomController.deleteAllMessages(req,res)})



module.exports = router;