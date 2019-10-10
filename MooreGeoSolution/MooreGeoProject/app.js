const express = require('express');
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('data.json')
const db = lowdb(adapter)

const serverPort = 8080;

var app = express();

app.use(express.json());

app.use(express.static('public'))

//Game Variables
var timerStart;
var oneGameSessionInSeconds = 60.0;
var delayAcceptanceRangeInSeconds = 10.0; 

app.get('/api/scores', (req, res) => {
    res.sendFile(__dirname + '/data.json');
});

//easier?
app.get('/api/game', (req, res) => {
    timerStart = new Date().getTime();
    console.log("Server game time started at: " + timerStart / 1000.0);
    res.sendStatus(201);
})

//needed to check Id?
//app.post('/api/game', (req, res) => {
//    res.sendStatus(201);
//});

var submits = 0;
app.post('/api/score', function (req, res) {
    //if (isScoreInTopTen(req.body.score))
    //for security

    console.log("Server submits: " + submits);

    var passedTime = new Date().getTime() - timerStart
    if (passedTime >= oneGameSessionInSeconds * 1000 && passedTime <= (oneGameSessionInSeconds + delayAcceptanceRangeInSeconds) * 1000) {
        db.get("scores")
            .push({ "nick": req.body.nick, "score": req.body.score })
            .write()
        res.sendStatus(201);
    }
    else
        res.sendStatus(403); //Forbidden
});



//TODO: for loop --> not write --> replace last element --> sort algorithm --> highest up!
//function isScoreInTopTen() {
//    db.get("scores")
//    return true;
//}

app.listen(serverPort);
console.log(`Started server on port ${serverPort}`);
