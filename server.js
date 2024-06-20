const cors = require("cors");
const path = require('path');
const express = require("express");
const expressStatic = require('express').static;
const settings = require("./settings");

const port = settings.port;
const staticHtmlPath = path.join(__dirname, './website');

const app = express();

var address = "";
var page = "";

function visitor (req, res, next) {
    if(address != req.headers['x-forwarded-for'] && page != req.headers['referer'])
    {
        address = req.headers['x-forwarded-for'];
        page = req.headers['referer'];
        console.log("Ip: " + address + "| page: " + page);
    }
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

app.get('/website', function (req, res) {
    console.log(req.socket.remoteAddress + "logged in")

});
