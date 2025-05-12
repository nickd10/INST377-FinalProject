const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('public/home.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('public/about.html', { root: __dirname });
});

app.get('/function', (req, res) => {
    res.sendFile('public/function.html', { root: __dirname });
});

//Create a new account: include username, password, initial currencies
app.post('/create-account', async (req, res) => {
    console.log("Adding new account...");

    console.log(req.body);
    const user_name = req.body.username;
    const initial_Currencies = req.body.initialCurrencies;

    const { data, error } = await supabase
  .from('users')
  .insert({ username: user_name,
            password: pass_word,
            initial_currencies: initial_Currencies
            })

});

//Log into the account

//update the account with crypto data

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});