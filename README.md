# Nodejs-Backend-APIs

This is a demo purposes Node.js REST API meant to be used to demonstrate the CA API Management tools.

## Getting Started

These are basic instructions that will help you to get this API running in no time.

### Prerequisites

* Node.js installed and running

* MongoDB server running in the same server and without any authentication enabled. If you want to enable authentication or use a remote server, you need to change the connection information inside the app.js file

### Starting your server

Clone the master branch to your local server. Then execute the following command to install all the required modules and create the **node_modules** folder:

```
npm install
```

After the installation finishes, you can now start your server by typing:

```
npm start
```

By default the server will be running in your localhost and use the port **8001 for HTTP and 8002 for HTTPS**. You can change them by editing the environment variables defined inside the **nodemon.json** file. If everything works fine you should see something like this in your console:

```
⇒  npm start

> rest-backend-api@1.0.0 start /Users/alancota/Development/7-Node/tmp/Nodejs-Backend-APIs
> nodemon server.js

[nodemon] 1.14.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node server.js`
Starting the server...
Server HTTP running at: http://YOURSERVER:8001
Server HTTPS running at: https://YOURSERVER:8002
Mongo DB Connected
```

You can download the swagger for that API in [this link](https://app.swaggerhub.com/apis/APIMCA/Nodejs-Backend-Demo/1.0.0).
