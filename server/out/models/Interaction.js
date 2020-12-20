"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const InteractionsSchema = new mongoose_1.Schema({
    _id: {
        type: mongodb_1.ObjectId,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    liked: [mongoose_1.Schema.Types.Mixed],
    unLiked: [mongoose_1.Schema.Types.Mixed],
    pending: [mongoose_1.Schema.Types.Mixed],
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
});
// ???
InteractionsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
module.exports = mongoose_1.model('Interactions', InteractionsSchema);
