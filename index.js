const express = require('express');
const session = require('express-session');
const security = require('./utils/securityUtils');
const path = require('path');
const fs = require('fs');

var jsonData;

fs.readFile('./data/access.json', 'utf8', function(err, data){
    if(err)
        console.log('Error: acces.json not found');
    else
        jsonData = JSON.parse(data);
});

const port = 3000;
const app = express();

app.use(session({secret:'chavebreq'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    if(req.session.login)
        res.render('logged-page');
    else
        res.render('index');
});

app.post('/', (req,res) => {
    if(req.body.login == jsonData.user && req.body.password == jsonData.pass) {
        req.session.login = jsonData.user;
        console.log(req.session.login + ' logged with success');
        res.render('logged-page', {login: jsonData.user});
    } else {
        res.render('index');
        console.log('Invalid Credentials by ' + req.body.login);
    }
});

app.post('/hash', (req,res) => {
    security.hashText(cachorro);
});

app.listen(port, () => {
    console.log('servidor iniciado.');
})