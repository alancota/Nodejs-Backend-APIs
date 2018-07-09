// Server handling
console.log("Starting the server...");
var os = require('os');
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = require('./app');

// Port configuration
const port = process.env.HTTP_SERVER_PORT || 8001;
const portSsl = process.env.HTTPS_SERVER_PORT || 8002;

const server = http.createServer(app);
const serverSsl = https.createServer({
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
},app);

// Listening only IPV4
server.listen(port, '0.0.0.0');
serverSsl.listen(portSsl, '0.0.0.0');

console.log("Server HTTP running at: http://"+os.hostname+":"+port);
console.log("Server HTTPS running at: https://"+os.hostname+":"+portSsl);
