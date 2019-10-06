const express = require('express');
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('data.json')
const db = lowdb(adapter)

var app = express();

app.use(express.json());

app.use(express.static('public'))

app.get('/api/scores', (req, res) => {
    res.sendFile(__dirname + '/data.json');
});

//app.get((req, res) => {
//});

app.post('/api/scores', function (req, res) {
    db.get("scores")
        .push({ "nick": req.body.nick, "score": req.body.score })
        .write()

    res.sendStatus(201);
});

app.listen(8080);