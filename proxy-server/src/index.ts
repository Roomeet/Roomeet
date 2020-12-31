const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
 
const app = express();
// "/socket.io": {
//     "target": "http://localhost:3334",
//      "ws": true
//  }
 
app.use('/api', createProxyMiddleware({
    //@ts-ignore
    target: `http://${ process.env.SOCKET || 'localhost'}:3002`,
    changeOrigin: true,
}));
app.use("/socket.io", createProxyMiddleware({
    //@ts-ignore
    target: `http://${ process.env.SOCKET || 'localhost'}:3002`,
    changeOrigin: true,
    ws: true,
    // pathRewrite: function (path, req) { return path.replace('^/socket', '') },
}));
app.use('/server', createProxyMiddleware({
    //@ts-ignore
    target: `http://${ process.env.SERVER || 'localhost'}:3001`,
    changeOrigin: true,
    pathRewrite: function (path, req) { return path.replace('/server', '') },
}));
app.listen(8080);
