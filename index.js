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

app.get('/home.html', (req, res) => {
    res.sendFile('public/home.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('public/about.html', { root: __dirname });
});

app.get('/function', (req, res) => {
    res.sendFile('public/function.html', { root: __dirname });
});

app.get('/users', async (req, res) => {
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


app.post('/user', async (req, res) => {
    console.log("Adding Data...");

    console.log(req.body);
    const userName = req.body.username;
    const cryptoName = req.body.crypto;

    const { error } = await supabase
    .from('user_crypto_favorites')
    .insert({ username: userName, crypto: cryptoName })
    .select()

    if(error) {
        console.error(error);
        
        return res.status(500).send('Error adding user');
    }

    
    return res.status(200).json({username: userName, crypto: cryptoName});
});


//Log into the account

//update the account with crypto data

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});