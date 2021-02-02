
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path'); 
const app = express();

app.use(express.static(path.join(__dirname, '../', '..', 'client', 'build')));

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

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
  });
  
app.listen(process.env.PORT || 80);