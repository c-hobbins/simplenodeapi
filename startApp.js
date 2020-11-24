const app = require("./server");
//const http = require("http");
//const https = require("https");

//Set the host:port for the runtime separate from server.js so as not to conflict with the execution of test.js 
const HTTP_PORT = 8080;
//const HTTPS_PORT = 443;
const HOST = '0.0.0.0';

//http.createServer(app).listen(HTTP_PORT);
//https.createServer(options, app).listen(HTTPS_PORT);

app.listen(HTTP_PORT, HOST);
console.log(`Simple Node/Express API service running on => http://${HOST}:${HTTP_PORT}`);