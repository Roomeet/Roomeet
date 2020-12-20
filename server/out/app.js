"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./api/index"));
const cors = require('cors');
require('dotenv').config();
const URI = process.env.MONGODB_URI;
const app = express_1.default();
let requestID = 0;
function logger(req, res, next) {
    console.log(`Request #${requestID}\nRequest fired: ${req.url}\nMethod: ${req.method}`);
    requestID += 1;
    next();
}
app.use(logger);
app.use(cors());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', express_1.default.static('./build/'));
app.use(express_1.default.json());
mongoose_1.default
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('connected to MongoDB!');
})
    .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
});
mongoose_1.default.set('useCreateIndex', true);
app.use('/api', index_1.default);
app.use('*', (req, res) => {
    res.sendStatus(404);
});
exports.default = app;
