import { Request, Response } from 'express';
const router = require("express").Router();
const notificationControllers = require("../../controllers/notificationControllers");


// GET all matches
router.get("/", (req :Request, res: Response) => {notificationControllers.getAllNotifications(req, res)});

router.get("/delete", (req :Request, res: Response) => {notificationControllers.deleteAllNotifications(req, res)});


module.exports = router;
