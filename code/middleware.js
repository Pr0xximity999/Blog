const utils = require("../code/utils/utilities.js");
const fs = require("node:fs");
const assets_directory = "./website/assets";

let ip = "";
let referer = "";
let page = "";
function logVisit (req, res) {
    let subdirectory = req.url.split("/");

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
}

function readImages (req, res) {
    fs.readdir(`${assets_directory}/images/image-drawer/`, (err, files) =>{
    let images = [];
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
        let data = JSON.stringify(images);
        fs.writeFile(`${assets_directory}/images/image-drawer/images.json`, data, (err) => {
            if(err)
            {
                console.log("Errir writing image json: " + data)
            }
        });
    })
}

module.exports = {
    logVisit,
    readImages
}