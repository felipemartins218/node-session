const crypt = require('crypto');
const express = require('express');
const fs = require('fs');

const app = express();

var jsonData;
fs.readFile('./data/access.json', 'utf8', function(err, data){
    if(err)
        console.log('Error: acces.json not found');
    else
        jsonData = JSON.parse(data);
});

// rounds to be add at password 
const saltRounds = 10;

module.exports = {
    // Hash and generate salt
    hashText: function(text){
        var salt = crypto.randomBytes(128).toString('base64');
        var iterations = 10000;
        var hash = pbkdf2(text, salt, iterations);
        console.log(hash);
    }
}

app.post('/', (res,req) => {
    hashText(req.body.textHash);
});

app.listen(3000, () => {
    this.hashText('cachorro');
});