import { Request, Response } from 'express';

const router = require('express').Router();
const likeControllers = require('../../controllers/likeControllers');

// GET all matches
router.get('/', (req :Request, res: Response) => { likeControllers.getAllLikes(req, res); });

router.get('/delete', (req :Request, res: Response) => { likeControllers.deleteAllLikes(req, res); });

module.exports = router;
