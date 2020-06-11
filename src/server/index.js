const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
// Start up an instance of app
const app = express();

const Sentiment = require('sentiment');
const aylien = require("aylien_textapi");
// set aylien API credentias
const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const mockAPIResponse = require('./mockAPI.js');

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

//Using API
projectData = {};
app.post('/results', addPost);

function addPost(req, response){
    console.log("Entry to POST")
    console.log(req.body);
    let data = {};
    let form = req.body.url;
    textapi.sentiment({
        'url': form,
        'mode': 'document'
    },
    function (error, res){
        if(error === null){
            console.log(res)
            projectData = data;
            data.polarity = res.polarity;
            data.subjectivity = res.subjectivity;
            data.confidence = res["polarity_confidence"];
            data.text = res.text;
            Object.assign(projectData, data);
            console.log('API has been called');
            response.send(data);
        } else{
            console.log('error');
        }
    });
}

// designates what port the app will listen to for incoming requests
// 8080 is for webpack dev server
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})