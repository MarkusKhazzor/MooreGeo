var gameloop = true;



window.onload = initialize;

var num = 0;

function spawnTarget() {
    // object.style.animation = "name duration timingFunction delay iterationCount direction fillMode playState" 
    
    var targetContainer = document.createElement("div");
    targetContainer.className = "targetContainer";

    var target = document.createElement("div");
    target.className = "target";

    targetContainer.appendChild(target);

    target.addEventListener("click", onTargetHit);
    document.getElementById("game").appendChild(targetContainer);
}


function myMove() {

    console.log("wowowowoow");
    var elem = document.getElementById("test");
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos  + 'px';
            elem.style.left = pos + 'px';
        }
    }
}

function onTargetHit(event) {
    console.log("I HIT IT! Current score: " + this.toString() +  "   " + ++num);
    this.parentNode.removeChild(this);
}


function initialize() {
    //spawnTarget();
    spawnTarget()

    document.getElementById("game").addEventListener("click", myMove);


    //while (gameloop) {
    //    setInterval(loop, 1000 / 60);
    //}
}














//function loop() {

//    console.log(num++);

//    if (num >= 10)
//        gameloop = false;

//}

function update(progress) {
    // Update the state of the world for the elapsed time since last render

}

function draw() {
    // Draw the state of the world
}

function loop(timestamp) {
    var progress = timestamp - lastRender

    update(progress)
    draw()


    window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)














function function1(data) {
    document.write(data.scores[0].nick)
}
function initializeAndFetchTest() {
    //document.write("initialize it!");

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

    //fetch('/api/scores').

    //var nun = (x) => x * x; --> C# tryen
}
