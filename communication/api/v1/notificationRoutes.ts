const router = require("express").Router();
import { Request, Response } from 'express';
const notificationControllers = require("../../controllers/notificationControllers");


// GET all matches
router.get("/", (req :Request, res: Response) => {notificationControllers.getAllNotifications(req, res)});

router.get("/delete", (req :Request, res: Response) => {notificationControllers.deleteAllNotifications(req, res)});


module.exports = router;
