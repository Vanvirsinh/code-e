const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const app = express();

// configuration for body-parser, ejs and static files.
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Configuration for OpenAI API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// get routes
app.get('/', (req, res) => {
    res.render('index')
});

// This will render the generated Images
app.get('/your-image/:q?', (req, res) => {

    let image = req.query.q;
    let response = openai.createImage({
        prompt: image,
        n: 4,
        size: "512x512"
    })

    response.then(response => {
        res.render('generated_image', {
            query: image,
            response: response
        })
    })
        .catch(err => {
            res.redirect("/");
        })

});

app.listen(3000, () => {
    console.log('The Server is running on the port 3000...');
});