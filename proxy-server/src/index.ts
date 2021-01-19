
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
 
const app = express();
 
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
}));
app.use("/socket.io", createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
    ws: true,
}));
app.use('/server', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: function (path, req) { return path.replace('/server', '') },
}));
app.listen(8080);