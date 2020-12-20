"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const router = express_1.Router();
// import { io } from '../../index'
// import { authenticateToken } from 'helpers/authenticate';
// routes:
// const chatRoutes = require('./chatRoutes');
router.use('/auth', authRoutes_1.default);
// router.use("/chatroom", /*authenticateToken, */ chatRoutes(io));
router.use('/users', userRoutes_1.default);
exports.default = router;
