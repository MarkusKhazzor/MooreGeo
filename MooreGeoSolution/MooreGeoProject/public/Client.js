window.onload = initialize;

var myNickName = "SSIO";
var myCurrentScore = 0;
var timerStart;

var minTargetSpawns;
var maxTargetSpawns;

var targetSpawnChancePerFrame;

//GameExtends
var gameHeight;
var gameWidth;


function initialize() {
    //Set Variables
    var gameExtendsDiv = document.getElementById("game");
    gameHeight = gameExtendsDiv.clientHeight;
    gameWidth = gameExtendsDiv.clientWidth;

    const { r, g, b } = hsv_to_rgb(0.5, 0.5, 0.95);
    console.log(`random rgb: ${r}, ${g}, ${b} `);
    console.log("tell me: " + generateCssCodeForRGBColor(hsv_to_rgb(0.5, 0.5, 0.95)));

    minTargetSpawns = 5;
    maxTargetSpawns = 10;

    targetSpawnChancePerFrame = 2;


    //START THE GAME
    tryToStartGame();
    //document.getElementById("game").addEventListener("click", firstTargetMoveType);
}

function plot(x, period, amplitude) {
    return Math.sin(x * period) * amplitude;
}

function generateWHY(x, amplitudeOffset, periodeOffset, periodeScale) {
    return (plot((x + periodeOffset) * periodeScale, 0.01, 75 + amplitudeOffset)
        + plot((x + periodeOffset) * periodeScale, 0.02, 50 + amplitudeOffset) * 0.25);
}

function spawnTarget() {

    // <create target>

    var target = document.createElement("div"); //creation

    var targetWidth = 30;
    var targetHeight = 30;

    target.id = "commonTarget"; //STYLE over ID in css and in js
    target.style.width = targetWidth + 'px';
    target.style.height = targetHeight + 'px';
    target.style.position = "absolute";
    target.style.backgroundColor = generateCssCodeForRGBColor(getRandomRGBValue());

    target.addEventListener("click", onTargetHit); //clickEvent //intervall mitgeben?

    document.getElementById("game").appendChild(target); //insertToGame

    // <animate target>

    var x = - targetWidth;
    const amplitudeOffset = Math.random() * 50.0 + 60;   
    const phaseOffset     = Math.random() * 600 - 300; // Verschiebung des Targets mitsamt Kurve vor oder zur¸ck
    const heightOffset    = Math.random() * 400 - 200; // Verschiebung der Kurve hoch oder runter
    const periodeOffset   = Math.random() * 600 - 300; // Verschiebung der Hˆhen und Tiefen
    const periodeScale    = (Math.random() + Math.random()) * 0.5 + 0.1; // Geschwindigkeit des hoch und runter bouncens

    var intervalTimeInMS = 5;

    var id = setInterval(() => {
        //not sure if this does something
        if (target == null) {
            clearInterval(id);
            console.log("target dead?")
            return;
        }

        if (parseInt(target.style.left) >= gameWidth + 10 /*delete target if it moved out of the window*/) {
            target.remove();
            //target.parentNode.removeChild(target); //error
            clearInterval(id);
        } else {
            x += 0.5;
            target.style.top = (generateWHY(x + phaseOffset, amplitudeOffset, periodeOffset, periodeScale) + gameHeight * 0.5 + heightOffset) + 'px';
            target.style.left = (x - (-phaseOffset)) + 'px';   // "x + phOff" -> "9 + 200" -> "9200". But "x - (-phOff)" -> "9 - (-200)" -> "209". Javascript -.-
        }
    }, intervalTimeInMS);
}

function onTargetHit(event) {
    console.log("I HIT IT! Current score: " + this.toString() + "   " + ++myCurrentScore);
    this.remove();
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

function startGame() {
    startGameSessionTimer();
    spawnMultipleTargets();
    //spawnTargetsInWaves //event an timer setzen? wenn so groﬂ dann?
    console.log("starting game");
}

function spawnMultipleTargets() {
    const amount = getRandomInt(minTargetSpawns, maxTargetSpawns);
    console.log(`Spawned ${amount} targets`);

    for (var i = 0; i < amount; i++) {
        spawnTarget();
    }
}

function startGameSessionTimer() {
    timerStart = new Date().getTime();
    window.requestAnimationFrame(updateTimer)
}

function updateTimer() {
    var timer = (new Date().getTime() - timerStart) / 1000;
    var timerDiv = document.getElementById('timer');
    timerDiv.innerHTML = timer

    if (Math.random() * 100 <= targetSpawnChancePerFrame)
        spawnTarget();

    if (timer >= 60.0) { //60.0
        timerDiv.innerHTML = "Game Finished!";
        tryToSubmitScore();
        tryToGetAllScores();
        return; //just submit it once --> stop so updateTimer won`t be called again
    }
    window.requestAnimationFrame(updateTimer)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function tryToGetAllScores() {
    fetch('/api/scores')
        .then((res) => res.json() //wenn einzeiler nimmt er direkt den shit als return ansonsten mit mehreren zeilen --> return angeben
            .then((data) => {
                createHighscoreTable(data);
                /*document.write(data.scores[0].nick)*/;
            }));
}

function createHighscoreTable() {
    console.log("created highscore table")


}

/* <Random color using HSV Color Space>  */

/* <Code from https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/ , converted from ruby> */

/**
 * Convert HSV color values to RGB color values.
 * HSV values in [0..1[
 * returns r, g, b  values from 0 to 255 as an object {r: r, g:g, b:b}
 */
function hsv_to_rgb(hue, saturation, value) {
    const hue_asInt = parseInt(hue * 6);
    const f = hue * 6 - hue_asInt;
    const p = value * (1 - saturation)
    const q = value * (1 - f * saturation)
    const t = value * (1 - (1 - f) * saturation)
    
    let r = 0;
    let g = 0;
    let b = 0;
    switch (hue_asInt) {

        case 0: // r, g, b = v, t, p if h_asInt == 0
            r = value;
            g = t;
            b = p;
            break;

        case 1:  // r, g, b = q, v, p if h_asInt == 1
            r = q;
            g = value;
            b = p; 
            break;

        case 2:  // r, g, b = p, v, t if h_asInt == 2
            r = p;
            g = value;
            b = t;
            break;

        case 3: // r, g, b = p, q, v if h_asInt == 3
            r = p;
            g = q;
            b = value;
            break;

        case 5: // r, g, b = v, p, q if h_asInt == 5
            r = value;
            g = p;
            b = q;
            break;
    }

    r = parseInt(r * 256);
    g = parseInt(g * 256);
    b = parseInt(b * 256);

    return { r: r, g: g, b: b};
}

/**
 * Generates random RGB color values with similar brightness.
 * returns r, g, b  values from 0 to 255 as an object {r: r, g:g, b:b}
 */
function getRandomRGBValue() {
    const golden_ratio_conjugate = 0.618033988749895;
    let hue = Math.random(); // use random start value

    hue += golden_ratio_conjugate;
    hue %= 1;
    return hsv_to_rgb(hue, 0.5, 0.95);
}

/* </ code from website> */

/**
 * Input is {r, g, b}. Specifically made to work with the output of "getRandomRGBValue()" or "hsv_to_rgb()". Inputs are floored.
 */
function generateCssCodeForRGBColor({ r, g, b }) {
    return `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
}

/* </random color> */









    
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
