"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const UserDataSchema = new mongoose_1.Schema({
    _id: {
        type: mongodb_1.ObjectId,
        required: true
    },
    userId: {
        type: mongodb_1.ObjectId,
        required: true
    },
    fullName: { type: String, required: true },
    aboutMe: { type: String, required: true },
    rentLocation: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    smoke: { type: String, required: true },
    pet: { type: Boolean, required: true },
    relationship: { type: Boolean },
    employed: { type: Boolean },
    numOfRoomates: Number,
    religion: Boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
});
UserDataSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports.default = mongoose_1.model('UserData', UserDataSchema);
