//dependencies
const path = require('path');

//Settings
const settings = require("./config/settings.json");
const port = settings.port;

//Middleware dependencies
const cors = require("cors");
const express = require("express");
const expressStatic = require('express').static;
const middleware = require("./code/middleware")

//Paths
const staticHtmlPath = "./website";
const notfoundPath = "./website/pages/404.html";

//Building the app
const app = express();

//Middleware
app.use(cors());
app.use(middleware.visitor);
app.use(middleware.readImages);
app.use(expressStatic(staticHtmlPath)); 

// Not found location
app.get('/404', (req, res) => {
    res.sendFile(path.join(__dirname, notfoundPath))
})

//Default
app.use((req, res, next) => {
    res.status(404).redirect('/404')
})

// start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}...`);
}).on('error', (err) => {
    console.error('Server startup error:', err);
});
