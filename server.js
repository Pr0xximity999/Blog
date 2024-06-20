const cors = require("cors");
const path = require('path');
const express = require("express");
const expressStatic = require('express').static;
const settings = require("./settings");

const port = settings.port;
const staticHtmlPath = path.join(__dirname, './website');

const app = express();

function visitor (req, res, next) {
    console.log(req.ip)
    console.log(req.path)
    console.log(req.method)
 
    next();
 }


app.use(cors());
app.use(visitor)
app.use(expressStatic(staticHtmlPath));

// start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}...`);
}).on('error', (err) => {
    console.error('Server startup error:', err);
});

app.get('/', function (req, res) {
    var userIP = req.socket.remoteAddress;
    console.log(userIP + " connected to the site.");
    res.send("I see you :)")
});
