window.onload = initialize;
var myNickName = "SSIO";
var myCurrentScore = 0;
var timerStart;


function spawnTarget() {
    var target = document.createElement("div"); //creation

    var targetStyleWidth = 15;
    var targetStyleHeight = 15;

    target.id = "commonTarget"; //STYLE over ID in css and in js
    target.style.width = targetStyleWidth + 'px';
    target.style.height = targetStyleHeight + 'px';

    target.addEventListener("click", onTargetHit); //clickEvent

    document.getElementById("game").appendChild(target); //insertToGame

    //setTargetPosition;
    //firstTargetMoveType(target); //SetMovement and position --> setonly movement!?!?!
}

function plot(x, period, amplitude) {
    return Math.sin(x * period) * amplitude;
}

function generateWHY(x, rnd) {
    return (plot(x, 0.01, 75 + rnd)
        + plot(x, 0.02, 50 + rnd) * 0.25);
}


function firstTargetMoveType(element) {
    var height = document.getElementById("game").clientHeight;
    var x = 1.0;
    var rnd = Math.random() * 50.0;

    var intervalTimeInMS = 5;
    var timer = 0;

    //getRandomInt(0.0,height)
    //element.style.top = /*generateWHY(x, rnd)+ */0.0 /** 0.5 */ + 'px'; //war height*0.5
    //element.style.top = /*generateWHY(x, rnd)+ */height /** 0.5 */ + 'px'; //war height*0.5

    element.style.left = x + 'px';

    //var id = setInterval(() => {
    //    if (timer >= 10000) {
    //        clearInterval(id);
    //    } else {
    //        timer += intervalTimeInMS;
    //        x+=0.5;
    //        element.style.top = generateWHY(x, rnd) + height*0.5 + 'px'; //war height*0.5
    //        element.style.left = x + 'px';
    //    }
    //}, intervalTimeInMS);
}

//function firstTargetMoveType(element) {
//    var height = document.getElementById("game").clientHeight;
//    var x = 1.0;
//    var rnd = Math.random() * 50.0;

//    var intervalTimeInMS = 5;
//    var timer = 0;

//    element.style.top = /*generateWHY(x, rnd)+ */0.0 /** 0.5 */ + 'px'; //war height*0.5
//    //element.style.top = /*generateWHY(x, rnd)+ */height /** 0.5 */ + 'px'; //war height*0.5

//    element.style.left = x + 'px';

//    //var id = setInterval(() => {
//    //    if (timer >= 10000) {
//    //        clearInterval(id);
//    //    } else {
//    //        timer += intervalTimeInMS;
//    //        x+=0.5;
//    //        element.style.top = generateWHY(x, rnd) + height*0.5 + 'px'; //war height*0.5
//    //        element.style.left = x + 'px';
//    //    }
//    //}, intervalTimeInMS);
//}
 
function onTargetHit(event) {
    console.log("I HIT IT! Current score: " + this.toString() +  "   " + ++myCurrentScore);
    this.parentNode.removeChild(this);
}


function initialize() {
    tryToStartGame();
    //spawnTarget();

    //document.getElementById("game").addEventListener("click", firstTargetMoveType);
}


function tryToSubmitScore() {
    var scoreJsonObj = { "nick": myNickName, "score": myCurrentScore }; //maybe stringify current score?

    fetch('/api/score', {
        method: 'POST',
        body: JSON.stringify(scoreJsonObj),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function tryToStartGame() {
    fetch('/api/game')
        .then((res) => {
            if (res.status == 201)
                startGame()
            else
                console.log("No game could be started")
                });
}

//to post credentials? --> or a
//function tryToStartGame() {
//    fetch('/api/game',
//    { 
//        method: 'POST',
//        body: null,
//        headers: {
//            'Content-Type': 'application/json'
//        }
//    })
//    .then((res) => {
//        if (res.status == 201)
//            startGame()
//        else
//            console.log("No game could be started")
//    });
//}

function startGame() {
    startGameSessionTimer();
    spawnMultipleTargets();
    //spawnTargetsInWaves //event an timer setzen? wenn so groﬂ dann?
    console.log("starting game");
}

function spawnMultipleTargets() {
    var amount = getRandomInt(1,3)

    for (var i = 0; i < amount; i++) {
        spawnTarget();
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function startGameSessionTimer() {
    timerStart = new Date().getTime();
    window.requestAnimationFrame(updateTimer)
}

function updateTimer() {
    var timer = (new Date().getTime() - timerStart) / 1000;
    var timerDiv = document.getElementById('timer');
    timerDiv.innerHTML = timer

    if (timer >= 60.0) { //60.0
        timerDiv.innerHTML = "Game Finished!";
        tryToSubmitScore();
        return; //just submit it once --> stop so updateTimer won`t be called again
    }
    window.requestAnimationFrame(updateTimer)
}




    
//Mostly Deprecated

//function update(progress) {
//    // Update the state of the world for the elapsed time since last render

//}

//function draw() {
//    // Draw the state of the world
//}

//function loop(timestamp) {
//    var progress = timestamp - lastRender

//    update(progress)
//    draw()


//    window.requestAnimationFrame(loop)
//}
//var lastRender = 0
//window.requestAnimationFrame(loop)



//STUFF TO THINK ABOUT
    //var nun = (x) => x * x; --> C# tryen

function initializeAndFetchTests() {
    //fetch('/api/scores')
    //    .then((res) => res.json()
    //        .then((data) => document.write(JSON.stringify(data))));

    fetch('/api/scores')
        .then((res) => res.json() //wenn einzeiler nimmt er direkt den shit als return ansonsten mit mehreren zeilen --> return angeben
            .then((data) => {
                document.write(data.scores[0].nick);
            }));

    fetch('/api/scores')
        .then((res) => res.json()
            .then(function (data) {
                document.write(data.scores[0].nick)
            }));

    function function1(data) {
        document.write(data.scores[0].nick)
    }
}
