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
const Match_1 = __importDefault(require("../../models/Match"));
// interfaces:
// mongoDB models:
const user_1 = __importDefault(require("../../models/user"));
const UserData_1 = __importDefault(require("../../models/UserData"));
const router = express_1.Router();
const crypto = require('crypto');
// const UserData = require('../../../models/userData');
// Routes
// Get all users
router.get('/', 
/* authenticateToken , */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
// Get all users data form
router.get('/basic-info', 
/* authenticateToken , */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const usersData = yield UserData_1.default.find(id ? { userId: String(id) } : {});
        res.json(usersData);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
// Get single user for client context
router.get('/email/:email', 
/* authenticateToken , */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const user = yield user_1.default.find({ email });
        res.json({
            id: user[0].id,
            name: user[0].name,
            lastName: user[0].lastName,
            email: user[0].email
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.get('/user-data/:id', 
/* authenticateToken , */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const userData = yield UserData_1.default.find({ userId: id });
        res.json({
            fullName: userData[0].fullName,
            aboutMe: userData[0].aboutMe,
            rentLocation: userData[0].rentLocation,
            age: userData[0].age,
            gender: userData[0].gender,
            smoke: userData[0].smoke,
            pet: userData[0].pet,
            relationship: userData[0].relationship,
            employed: userData[0].employed,
            numOfRoomates: userData[0].numOfRoomates,
            religion: userData[0].religion
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
// update user data form
router.post('/user-data/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { body: rawUserData } = req;
        const userData = new UserData_1.default(Object.assign({}, rawUserData));
        yield UserData_1.default.findOneAndUpdate({ userId: id }, userData, { new: true }, (error, result) => {
            if (!error) {
                // If the document doesn't exist
                if (!result) {
                    // Create it
                    result = new UserData_1.default(Object.assign(Object.assign({}, rawUserData), { _id: new mongodb_1.ObjectId(), userId: new mongodb_1.ObjectId(rawUserData.userId), createdAt: new Date(), updatedAt: null, deletedAt: null }));
                    // Save the document
                    result.save((err) => {
                        if (!err) {
                            // Do something with the document
                            res.status(200).send('user form created');
                        }
                        else {
                            res.json({ error: err });
                        }
                    });
                }
                else {
                    res.status(200).send('user form updated');
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
// Match users
router.post('/match', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body: rawMatch } = req;
        const _id = crypto
            .createHash('md5')
            .update(rawMatch.userId + rawMatch.passiveUserId)
            .digest('hex')
            .slice(0, 24);
        // @ts-ignore
        Match_1.default.findOneAndUpdate({ _id }, rawMatch, { new: true }, (error, result) => {
            if (!error) {
                // If the document doesn't exist
                if (!result) {
                    // Create it
                    result = new Match_1.default(Object.assign(Object.assign({}, rawMatch), { _id: new mongodb_1.ObjectId(_id), createdAt: new Date(), updatedAt: null, deletedAt: null }));
                }
                // Save the document
                result.save((err) => {
                    if (!err) {
                        // Do something with the document
                        res.json(rawMatch.like ? 'Matched' : 'Unmatched');
                    }
                    else {
                        res.json({ error: err });
                    }
                });
            }
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.get('/match-all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        // @ts-ignore
        const matches = yield Match_1.default.find({ userId });
        res.status(200).json(matches);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.get('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        yield user_1.default.deleteMany({});
        res.status(200).json('deleted');
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.get('/userData/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        yield UserData_1.default.deleteMany({});
        res.status(200).json('deleted');
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
exports.default = router;
