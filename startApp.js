const app = require("./server");

const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Simple Node/Express API service running on => http://${HOST}:${PORT}`);