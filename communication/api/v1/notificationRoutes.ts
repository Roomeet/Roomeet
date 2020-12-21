import { Request, Response } from 'express';
const router = require("express").Router();
const notificationControllers = require("../../controllers/notificationControllers");


// GET all matches
router.get("/", (req :Request, res: Response) => {notificationControllers.getAllNotifications(req, res)});

router.get("/userId/:userId", (req :Request, res: Response) => {notificationControllers.getAllNotificationsByUserId(req, res)});

router.get("/delete", (req :Request, res: Response) => {notificationControllers.deleteAllNotifications(req, res)});

router.put("/:notificationId/seen", (req :Request, res: Response) => {notificationControllers.seeNotification(req, res)});

module.exports = router;
