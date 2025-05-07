const cors = require("cors");
const path = require('path');
const express = require("express");
const expressStatic = require('express').static;
const settings = require("./settings");

const port = settings.port;
const staticHtmlPath = path.join(__dirname, './website');


const app = express();

var address = "";
var referer = "";
var page = "";
function visitor (req, res, next) {
    if(address != req.headers['x-forwarded-for'] || referer != req.headers['referer'])
    {
        address = req.headers['x-forwarded-for']
        referer = req.headers['referer'] 
        page = req.headers['location']
        console.log(Date.now() +
            " | Ip: " + address + 
            " | ref page: " + referer + 
            " | req page: " + page);
    }
    next();
}


app.use(cors());
app.use(visitor)
app.use(expressStatic(staticHtmlPath)); 

app.use((req, res, next) => { 
    res.status(404).sendFile(path.join(__dirname, './website/404.html'))
})

// start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}...`);
}).on('error', (err) => {
    console.error('Server startup error:', err);
});
