"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const UserPreferenceSchema = new mongoose_1.Schema({
    _id: {
        type: mongodb_1.ObjectId,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    ages: { type: mongoose_1.Schema.Types.Mixed },
    genders: { type: mongoose_1.Schema.Types.Mixed },
    smokes: Boolean,
    pets: Boolean,
    relationship: Boolean,
    employed: Boolean,
    interests: [String],
    languages: [String],
    music: [String],
    lookingFor: { type: mongoose_1.Schema.Types.Mixed },
    numOfRoomates: Number,
    religion: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
});
UserPreferenceSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
module.exports = mongoose_1.model('UserPreferences', UserPreferenceSchema);
