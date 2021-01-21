/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';

const router = require('express').Router();
const matchControllers = require('../../controllers/matchControllers');

// GET all matches
router.get('/', (req :Request, res: Response) => { matchControllers.getAllMatches(req, res); });

// GET all matches for user by id
router.get('/user/:userId', (req :Request, res: Response) => { matchControllers.getAllMatchesByUserId(req, res); });

// DELETE all matches
router.get('/delete', (req :Request, res: Response) => { matchControllers.deleteAllMatches(req, res); });

router.post('/un-match', (req :Request, res: Response) => { matchControllers.cancelMatch(req, res); });

module.exports = router;
