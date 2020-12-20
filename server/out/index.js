"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 3001;
app_1.default.listen(port, () => {
    console.log(`Roomeet is listening on port ${port}!`);
});
// const server = chatApp.listen(8080, () => {
//   console.log("chat server is listening on port 8080");
// });
// export const io = require('socket.io')(server);
// io.on('connect', (socket: any) => {
//   console.log('socket connected');
// });
