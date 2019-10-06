window.onload = initialize;

function initialize() {

}


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
