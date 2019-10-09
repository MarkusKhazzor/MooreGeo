window.onload = initialize;
var myNickName = "SSIO";
var myCurrentScore = 0;
var timerStart;


function spawnTarget() {
    var target = document.createElement("div");
    target.id = "test";
    target.addEventListener("click", onTargetHit);
    document.getElementById("game").appendChild(target);
    firstTargetMoveType(target);
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

    var id = setInterval(() => {
        if (timer >= 10000) {
            clearInterval(id);
        } else {
            timer += intervalTimeInMS;
            x+=0.5;
            element.style.top = generateWHY(x, rnd) + height*0.5 + 'px';
            element.style.left = x + 'px';
        }
    }, intervalTimeInMS);
}
 
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
    startTimer();
    //spawnTargetsInWaves //event an timer setzen? wenn so groß dann?
    console.log("starting game");
}


function startTimer() {
    timerStart = new Date().getTime();
    window.requestAnimationFrame(updateTimer)
}

var submits = 0;
function updateTimer() {
    var timer = (new Date().getTime() - timerStart) / 1000;
    var timerDiv = document.getElementById('timer');
    timerDiv.innerHTML = timer;

    if (timer >= 60.0) { //60.0
        timerDiv.innerHTML = "Game Finished!";
        tryToSubmitScore();
        console.log("submits: " + submits);
        submits++;
        return;
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
