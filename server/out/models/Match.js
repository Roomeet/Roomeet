"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
function usersLimit(users) {
    return users.length === 2;
}
const MatchSchema = new mongoose_1.Schema({
    _id: {
        type: mongodb_1.ObjectID,
        required: true,
    },
    users: {
        type: [String],
        required: true,
        validate: {
            validator: usersLimit,
            message: "A match can occur between two peoples only",
        },
    },
    canceled: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
});
MatchSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports.default = mongoose_1.model('Match', MatchSchema);
