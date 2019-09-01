// Example express application adding the parse-server module to expose Parse
// compatible API routes.

const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
var cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const ParseDashboard = require("parse-dashboard");
const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}
// Actual App server
let api = new ParseServer({
  databaseURI: databaseUri,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL
});
// Dashboard 
let config = {
  allowInsecureHTTP: true,
  apps: [{
    serverURL: process.env.SERVER_URL,
    appId: process.env.APP_ID,
    masterKey: process.env.MASTER_KEY,
    appName: "Blood meta data"
  }],
  users: [{
    user: "developer",
    pass: "Koodaus1"
  }]
};
let dashboard = new ParseDashboard(config, {
  allowInsecureHTTP: config.allowInsecureHTTP
});
let app = express();
app.use('/app', express.static(path.join(__dirname, '/public')));

let mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website. Use /app so see the magic');
});

let port = process.env.PORT || 1337;
let httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
app.use(cors());
app.use("/dashboard", dashboard);
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
