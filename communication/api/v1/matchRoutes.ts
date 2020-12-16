const router = require("express").Router();
import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
const matchControllers = require("../../controllers/matchControllers");

router.post("/unMatch", (req :Request, res: Response) => {matchControllers.cancelMatch});

router.get("/", (req :Request, res: Response) => {matchControllers.getAllMatches(req, res)});

module.exports = router;