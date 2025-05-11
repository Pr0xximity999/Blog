const utils = require("../code/utils/utilities.js");
const fs = require("node:fs");
const assets_directory = "./website/assets";

var ip = "";
var referer = "";
var page = "";
function logVisit (req, res, next) {
    var subdirectory = req.url.split("/");

    //check if the subdirectory is a page or landingpage
    if(['index.html', 'pages'].includes(subdirectory[1]))
    {
        if(ip !== req.headers['x-forwarded-for'] || referer !== req.headers['referer'])
        {
            ip = req.headers['x-forwarded-for']
            referer = req.headers['referer']
            page = req.url
            console.log(
                utils.GetFullDateTime() + ' | ' +
                `Ip: ${ip} | ` +
                `ref page: ${referer} | `+
                `req page: ${page} | `);
        }
    }
    next();
}

function readImages (req, res, next) {
    var images = [];
    fs.readdir(`${assets_directory}/images/image-drawer/`, (err, files) =>{
        if(err)
        {
            console.log("Error reading images: " + err)
        }
        else
        {
            files.forEach(file => {
                images.push(file)
            })
        }
    })
    var data = JSON.stringify(images);
    fs.writeFile(`${assets_directory}/images/image-drawer/images.json`, data, (err) => {
        if(err)
        {
            console.log("Errir writing image json: " + data)
        }
    });
    next();
}

module.exports = {
    visitor: logVisit,
    readImages
}