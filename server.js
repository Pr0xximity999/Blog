const cors = require("cors");
const path = require('path');
const express = require("express");
const expressStatic = require('express').static;
const settings = require("./settings");
const fs = require('fs')

const {rssRouter} = require('./website/AvansRss/avansRss.js');

const port = settings.port;
const staticHtmlPath = path.join(__dirname, './website');
const avansRssPath = path.join(__dirname, './website/avansrss/avansrss.html')

const app = express();

var address = "";
var page = "";

function visitor (req, res, next) {
    if(address != req.headers['x-forwarded-for'] || page != req.headers['referer'])
    {
        address = req.headers['x-forwarded-for']
        page = req.headers['referer'] 
        console.log("Ip: " + address + "| page: " + page);
    }
    next();
}


app.use(cors());
app.use(visitor)
app.use(expressStatic(staticHtmlPath)); 

// app.use('/avansrss', rssRouter);

app.use((req, res, next) => { 
    res.status(404).sendFile(path.join(__dirname, './website/404.html'))
})

// start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}...`);
}).on('error', (err) => {
    console.error('Server startup error:', err);
});
