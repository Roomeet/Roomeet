"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
// interfaces & mongoDB models:
const user_1 = __importDefault(require("../../models/user"));
const refreshToken_1 = __importDefault(require("../../models/refreshToken"));
const authenticate_1 = require("../../helpers/authenticate");
const router = express_1.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// helpers:
const userIsExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email }).exec();
    return user;
});
const generateToken = (userInfo) => jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '900s' });
// validateToken
router.get('/validateToken', authenticate_1.authenticateToken, (req, res) => {
    res.send(true);
});
// get new access token
router.post('/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.token;
    const validRefreshToken = yield refreshToken_1.default.findOne({ token: refreshToken });
    if (!validRefreshToken) {
        return res.status(403).json({ message: 'Invalid Refresh Token' });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Refresh Token' });
        }
        delete decoded.iat;
        delete decoded.exp;
        const updatedAccessToken = generateToken(decoded);
        res.cookie('accessToken', updatedAccessToken);
        res.json({ message: 'token updated' });
    });
}));
// Registers new user
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body: userRegisterationData } = req;
        userRegisterationData.password = yield bcrypt.hash(userRegisterationData.password, 10);
        const newUser = new user_1.default({
            _id: new mongodb_1.ObjectId(),
            name: userRegisterationData.name,
            lastName: userRegisterationData.lastName,
            password: userRegisterationData.password,
            email: userRegisterationData.email,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null
        });
        newUser.save().then(() => res.status(201).send('Registerd!'));
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
// login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    const user = yield userIsExist(loginData.email);
    if (!user) {
        return res.status(404).send('cannot find user');
    }
    try {
        yield bcrypt.compare(loginData.password, user.password, (err, result) => {
            if (err) {
                res.status(403).send(err);
            }
            else if (!result) {
                res.status(403).send('User or Password incorrect');
            }
        });
        const expiresIn = loginData.rememberMe ? '365 days' : '24h';
        const infoForCookie = {
            userId: user.id,
            email: user.email
        };
        // assigning new refresh token
        const refreshToken = jwt.sign(infoForCookie, process.env.REFRESH_TOKEN_SECRET, { expiresIn });
        // checking if the user already have a token, and if does updates it.
        const existingRefreshToken = yield refreshToken_1.default.findOneAndUpdate({ email: loginData.email }, { token: refreshToken });
        // if user dosent have a token, creates one.
        if (!existingRefreshToken) {
            const newRefreshToken = new refreshToken_1.default({
                _id: new mongodb_1.ObjectId(),
                email: user.email,
                token: refreshToken,
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null
            });
            newRefreshToken.save();
        }
        const accessToken = yield generateToken(infoForCookie);
        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', refreshToken);
        res.cookie('email', user.email);
        res.cookie('id', user.id);
        res.status(200).send({ accessToken, email: user.email, id: user.id });
    }
    catch (error) {
        res.status(403).send();
    }
}));
exports.default = router;
