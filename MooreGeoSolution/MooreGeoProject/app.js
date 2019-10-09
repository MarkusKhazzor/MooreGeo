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

//easier?
app.get('/api/game', (req, res) => {
    res.sendStatus(201);
})

//needed to check Id?
//app.post('/api/game', (req, res) => {
//    res.sendStatus(201);
//});


app.post('/api/score', function (req, res) {
    //if (isScoreInTopTen(req.body.score))
      db.get("scores")
        .push({ "nick": req.body.nick, "score": req.body.score })
        .write()

    res.sendStatus(201);
});



//TODO: for loop --> not write --> replace last element --> sort algorithm --> highest up!
//function isScoreInTopTen() {
//    db.get("scores")
//    return true;
//}

app.listen(8080);