"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const RefreshTokenSchema = new mongoose_1.Schema({
    _id: {
        type: mongodb_1.ObjectId,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
});
RefreshTokenSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = mongoose_1.model('RefreshToken', RefreshTokenSchema);
