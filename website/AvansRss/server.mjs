import express from 'express';
import fetch from 'node-fetch';
import fs from 'node:fs'
import convert from 'xml-js'


//Im lazy to type the dictionary lookup every time
function GetData(dict, tag, tag2='_text')
{
    return dict[tag][tag2];
}

export const rssRouter = express.Router();
rssRouter.use(express.json())

rssRouter.get('', (req, res) => {
    //Fetch the RSS xml
    fetch('https://brightspace.avans.nl/d2l/le/news/rss/6606/consolidated?token=avfnkdnxdnbi5qej11c39&ou=6606')

        //Parse the response to text
        .then(response => response.text())
        .then((xml) => {

            fs.readFile('./index.html', 'utf8', (err, document) => {          
                //Format the xml and grab the rss data
                var json = JSON.parse(convert.xml2json(xml, {
                    compact: true
                }))['rss'];


                
                var articles = [];
                json['channel']['item'].forEach(a => {
                    var textTemplate = `<div id='AvansRss'>
                            <div id='HeaderDiv_${GetData(a, 'guid')}'>
                                <div id='titleDiv'>
                                    <h1 id='title'>${GetData(a, 'title')}</h1>
                                </div>
                                <div id='pubDateDiv'>
                                    <span id='pubDate' data-value='${GetData(a, 'pubDate')}'>${GetData(a, 'pubDate')}</span>
                                </div>
                            </div>
                            <div id='descriptionDiv'>
                                ${GetData(a, 'description')}
                            </div>
                            <div id='linkDiv'>
                                <a href='${GetData(a, 'link')}', id='link'>${GetData(a, 'link')}</a>
                            </div>
                        </div>`
                    textTemplate = textTemplate.replace(/style=".*"/gm, '')
                    
                    articles.push(textTemplate)
                    });
                    
                var page = articles.join('')
                    
                //Insert the rss into the html
                res.status(200).send(page);
            })
        })

        //In case of any errors
        .catch(error => {
            console.log(error);
            res.status(500).send(error)
        }
        );
});


//Run the server
app.listen(3000, () => console.log('Server running on port 3000'));