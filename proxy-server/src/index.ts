
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
 
const app = express();
// "/socket.io": {
//     "target": "http://localhost:3334",
//      "ws": true
//  }
 
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
}));
app.use("/socket.io", createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
    ws: true,
    // pathRewrite: function (path, req) { return path.replace('^/socket', '') },
}));
app.use('/server', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: function (path, req) { return path.replace('/server', '') },
}));
app.listen(8080);