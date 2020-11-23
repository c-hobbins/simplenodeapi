const app = require("./server");

//Set the host:port for the runtime separate from server.js so as not to conflict with the execution of test.js 
const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Simple Node/Express API service running on => http://${HOST}:${PORT}`);