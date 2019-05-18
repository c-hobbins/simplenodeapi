'use strict';

const express = require('express');
const PORT = 8099;
const HOST = '0.0.0.0';
const app = express();

app.get('/clients', (req, res)=>{
   res.send({ resultcode:200, message: 'This is the response! Would be a JSON object containing a list of all clients that should be restrictied by permission.'});
});

app.get('/clients/:clientId', (req, res)=>{
   res.send( {resultcode: 200, message: 'This would have returned a client with [Id]=' + req.params.clientId + '.'});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);