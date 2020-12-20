"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jwt = require('jsonwebtoken');
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Or undefiend or the access token
    if (token === null)
        return res.status(401).send('Access Token Required');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log('error in authenticate token', err);
            return res.status(403).send('Invalid Access Token'); // you got a token but this is no longer valid
        }
        req.body.user = decoded;
        next();
    });
};
exports.default = exports.authenticateToken;
