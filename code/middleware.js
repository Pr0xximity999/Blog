const utils = require("../code/utils/utilities.js");
const fs = require("node:fs");
const settings = require("../config/settings.json");
const assets_directory = "./website/assets";

var address = "";
var referer = "";
var page = "";
function visitor (req, res, next) {
    if(address != req.headers['x-forwarded-for'] || referer != req.headers['referer'])
    {
        address = req.headers['x-forwarded-for']
        referer = req.headers['referer']
        page = req.headers['location']
        console.log(
            utils.GetFullDateTime() + ' | ' +
            `Ip: ${address} | ` +
            `ref page: ${referer} | `+
            `req page: ${page} | `);
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
    visitor,
    readImages
}