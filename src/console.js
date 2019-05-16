/////
// Console YUI
/////
YUI().use("node", function(Y) {

    var COMMANDS = [
        {
            name: "photo-album",
            handler: getPhotoIdsTitles
        },

        {
            name: "greet",
            handler: helloLT
        }
    ];

    function processCommand() {
        var inField = Y.one("#in");
        var input = inField.get("value");
        var parts = input.replace(/\s+/g, " ").split(" ");
        var command = parts[0];
        var args = parts.length > 1 ? parts.slice(1, parts.length) : [];

        inField.set("value", "");

        for (var i = 0; i < COMMANDS.length; i++) {
            if (command === COMMANDS[i].name) {
                COMMANDS[i].handler(args);
                return;
            }
        }

        outputToConsole("Unsupported Command: " + command);
    }

    /////
    // Command Functions
    /////

    function getPhotoIdsTitles(args) {

        $.getJSON('https://jsonplaceholder.typicode.com/photos?albumId=' + args[0], function(data) {
            outputToConsole("photo-album " + args[0]);
            for(var i=0; i < data.length; i++){
                var photoID = `${data[i].id}`;
                var photoTitle = `${data[i].title}`;
                console.log(data[i].title);
                outputToConsole("[" + photoID + "] " + photoTitle);
            }
        })
    }

    function helloLT() {
        outputToConsole("Hello Lean TECHniques, welcome to my photo album console application!");
    }

    /////
    // YUI Functions
    /////
    function outputToConsole(text) {
        var p = Y.Node.create("<p>" + text + "</p>");
        Y.one("#out").append(p);
        p.scrollIntoView();
    }

    Y.on("domready", function(e) {
        Y.one("body").setStyle("paddingBottom", Y.one("#in").get("offsetHeight"));
        Y.one("#in").on("keydown", function(e) {
            if (e.charCode === 13) {
                processCommand();
            }
        });
    });
});