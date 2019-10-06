window.onload = initialize;

function function1(data) {
    document.write(data.scores[0].nick)
}

function initialize() {
    //document.write("initialize it!");

    //fetch('/api/scores')
    //    .then((res) => res.json()
    //        .then((data) => document.write(JSON.stringify(data))));

    fetch('/api/scores')
        .then((res) => res.json()
            .then((data) => {
                document.write(data.scores[0].nick);
            }));

    fetch('/api/scores')
        .then((res) => res.json()
            .then(function (data) {
                document.write(data.scores[0].nick)
            }));

    //var nun = (x) => x * x; --> C# tryen
}


