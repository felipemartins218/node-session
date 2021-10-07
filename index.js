const express = require('express');
const session = require('express-session');
const path = require('path');

const port = 3000;
const app = express();

var login = 'felipe';
var password = '12345';

app.use(session({secret:'chavebreq'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    if(req.session.login){
        res.render('logged-page');
    } else {
        res.render('index');
    }
});

app.post('/', (req,res) => {
    if(req.body.login == login && req.body.password == password) {
        req.session.login = login;
        console.log(req.session.login + ' logged with success');
        res.render('logged-page', {login: login});
    } else {
        res.render('index');
        console.log('Invalid Credentials by ' + req.body.login);
    }
});

app.listen(port, () => {
    console.log('servidor rodando.');
})