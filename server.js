// Server handling
console.log("Starting the server...");
var os = require('os');
const http = require('http');
const app = require('./app');

const port = process.env.SERVER_PORT || 8001;
const server = http.createServer(app);

server.listen(port);

console.log("Server running at: http://"+os.hostname+":"+port);
