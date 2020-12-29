const fs = require('fs');
const https = require('https');
const http = require('http');

const app = require("./server");

//Set the host:port for the runtime separate from server.js so as not to conflict with the execution of test.js 
const HTTP_PORT = process.env.HTTP_PORT; //8080
const HTTPS_PORT = process.env.HTTPS_PORT; //8443
const HOST = '0.0.0.0';

const boolRequireClientCert = process.env.REQUIRE_CLIENT_CERT;

console.log(process.env.REQUIRE_CLIENT_CERT);

const options = {
  //The ca.crt is only needed if client certificate is requested && the provided client cert is self signed.
  ca: fs.readFileSync('./certs/ca.crt'),
  cert: fs.readFileSync('./certs/server.cert'),
  key: fs.readFileSync('./certs/server.key'),
  requestCert: boolRequireClientCert?true:false,
  rejectUnauthorized: boolRequireClientCert?true:false
};

http.createServer(app).listen(HTTP_PORT);
https.createServer(options, app).listen(HTTPS_PORT);

//app.listen(HTTP_PORT, HOST);
console.log(`Simple Node/Express API service running on => http://${HOST}:${HTTP_PORT} and https://${HOST}:${HTTPS_PORT}`);