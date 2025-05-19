# INST377-FinalProject

Title: Crypto Tracker
Description: This project aims to give users an easy to use full-stack real-time cryptocurrency market data tracking interfrace. This web application gives users access to top coins and currencies recent performances, up to date news feeds, and a personalized tracking feature where the user can manage their individual watchlist/portfolio. Using a database on the backend and front-end libraries, the user is able to keep track of their favorite cryptos and see their most recent performances.
Target Browsers: Google Chrome (Desktop and Android), Safari, Microsft Edge. This is intended for mostly any browser that can support CORS for one of the API's to work.
[Developer Manual](#developer-manual)



# Developer Manual
## Dependancies and Install: 
For developers, the will need to install a series of packages to pick up where this project leaves off. Developers will need to install: node, express, nodemon, bodyparser, dotenv, and supabase. To install these, developers will need to run a series of commands in the terminal. When first setting up the environement in the terminal, the user should start with "npm init" before installing the packages. In the init process, you mostly only need to worry about putting your name as the author of the project. The commands will consist of being in the necessary directory and installing each package my using "npm install {package name}". The package names are as listed but will be: node, express, nodemon, bodyparser, dotenv, and  @supabase/supabase-js. Once the server is set up locally (which we will get to), you can start by using the command "npm start". In addition to these server based dependencies, there are a few API dependencies.

For Supabase, you will need to have a Supabase account set up, which you will then need to obtain your supabase link and key from the specific project you are working on. After defining both of those links as variables in your .env file, you will use them in your index.js file as such: 

const supabaseUrl = process.env.SUPABASE_URL;

const supabaseKey = process.env.SUPABASE_KEY;

const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

CoinCap API: You will need to obtain your own API Key to pull the cryptocurrency data. Link: https://pro.coincap.io/api-docs

Cryptopanic API: You will need to obtain your own API Key to use the crypto news API. Link: https://cryptopanic.com/developers/api/

## Running Application on a Server: 
To run the server locally, you will need to have the necessary packages installed as detailed in the section above, and also an index.js file. In this file you will need to set up all of the apps requirements which is a series of lines of code that will most likely look like the following:

const express = require('express');

const supabaseClient = require('@supabase/supabase-js');

const bodyParser = require('body-parser');

const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
(For this line to work, all of the files that will be displayed and used in the actual site must be in a folder within your working directory called "public")


These lines of code will ensure that the server is set up and the packages are being used within the app. The line "const port=3000;" specifies which port the server will be running on locally, 3000 should work for most.

If all of your packages are installed correctly, you can run your app locally but going into your browser, or even something like Insomnia, and typing "http://localhost:3000/". How this works with the API end points will be explained further in the following section. For now, to have a even a blank page appear, you need a line that will send an HTML file for the "/" request which would be something like:

app.get('/', (req, res) => {
    res.sendFile('public/home.html', { root: __dirname });
});

You will also need a line such as this:

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

For real deployment, you will need to connect the Github repository you are working on this with, to an account with Vercel to deploy the project. Link: [https:/](https://vercel.com/)

Once you have your account connected and set up, you will go into the settings tab of your project and then go to Environment Variables for which you will input your Supabase link and key variables from your .env file. Next you will need a vercel.json file to have the routing figured out between the site and your project.

This file will look something like: 
{
    "version": 2,
    "builds": [
        {
            "src": "./index.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/"
        }
    ]

}

Once you have connected your vercel and have it set up, you will have a domain link that you can distribute to others to access your site. This will look something like this: 
https://inst-377-final-project-mocha.vercel.app/
(This is my projects link)

# API for Server Application
## GET
1. The first GET request endpoint in this project is:
app.get('/', (req, res) => {
    res.sendFile('public/home.html', { root: __dirname });
});

This returns the home.html page when the user first reaches the app through the vercel link.

The following two requests do the same thing but to the other two pages available on my site:

2. app.get('/about', (req, res) => {
    res.sendFile('public/about.html', { root: __dirname });
});

3. app.get('/function', (req, res) => {
    res.sendFile('public/function.html', { root: __dirname });
});

app.get('/users') will return the all of the users listed in the Supabase table I have setup to take in the information from the site. It will take in the username, crypto and then create an id and created_at time stamp. This is intended to be used for pulling the users data based on username and displaying their search history and visualize their favorite cryptos.
4.  app.get('/users', async (req, res) => {
    console.log("Fetching users...");

    const { data, error } = await supabase
        .from('user_crypto_favorites')
        .select('*');

    if (error) {
        console.error(error);
        res.status(500).send('Error fetching users');
    } else {
        res.json(data);
    }
});



## POST

app.post('/users') is used in a POST method to add the users data to the database table so it can be stored and displayed on the site. It will take in the username and crypto from the user and store it.

5. app.post('/user', async (req, res) => {
    console.log("Adding Data...");

    console.log(req.body);
    var userName = req.body.username;
    var cryptoName = req.body.crypto;

    const { data, error } = await supabase
    .from('user_crypto_favorites')
    .insert({ username: userName, 
            crypto: cryptoName })
    .select();

    if(error) {
        console.error(error);
        return res.status(500).send('Error adding user');
    } else {
        res.send(data);
    }

});
