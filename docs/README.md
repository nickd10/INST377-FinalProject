# INST377-FinalProject

Title: Crypto Tracker
Description: This project aims to give users an easy to use full-stack real-time cryptocurrency market data tracking interfrace. This web application gives users access to top coins and currencies recent performances, up to date news feeds, and a personalized tracking feature where the user can manage their individual watchlist/portfolio. Using a database on the backend and front-end libraries, the user is able to keep track of their favorite cryptos and see their most recent performances.
Target Browsers: Google Chrome (Desktop and Android), Safari, Microsft Edge. This is intended for mostly any browser that can support CORS for one of the API's to work.
[Developer Manual](#developer-manual)



# Developer Manual
Dependancies and Install: For developers, the will need to install a series of packages to pick up where this project leaves off. Developers will need to install: node, express, nodemon, bodyparser, dotenv, and supabase. To install these, developers will need to run a series of commands in the terminal. When first setting up the environement in the terminal, the user should start with "npm init" before installing the packages. In the init process, you mostly only need to worry about putting your name as the author of the project. The commands will consist of being in the necessary directory and installing each package my using "npm install {package name}". The package names are as listed but will be: node, express, nodemon, bodyparser, dotenv, and  @supabase/supabase-js. Once the server is set up locally (which we will get to), you can start by using the command "npm start". In addition to these server based dependencies, there are a few API dependencies.

For Supabase, you will need to have a Supabase account set up, which you will then need to obtain your supabase link and key from the specific project you are working on. After defining both of those links as variables in your .env file, you will use them in your index.js file as such: 

const supabaseUrl = process.env.SUPABASE_URL;

const supabaseKey = process.env.SUPABASE_KEY;

const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

CoinCap API: You will need to obtain your own API Key to pull the cryptocurrency data. Link: https://pro.coincap.io/api-docs
Cryptopanic API: You will need to obtain your own API Key to use the crypto news API. Link: https://cryptopanic.com/developers/api/

Running Application on a Server: To run the server locally, you will need to have the necessary packages installed as detailed in the section above, and also an index.js file. In this file you will need to set up all of the apps requirements which is a series of lines of code that will most likely look like the following:

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

If all of your packages are installed correctly,