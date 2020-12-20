const express = require("express");
const Overwrite = require("./models/Overwrite.js");
const overwritesData = require("./data/overwrites.json");
const Source = require("./models/Source.js");
const sourcesData = require("./data/sources.json");

console.log("Preparing to launch Express.js server");

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

function printReq(req, res, next) {
    console.log("Request query: ");
    console.log(req.query);
    console.log("Request params: ");
    console.log(req.params);
    if (req.body) {
        console.log("Request body: ");
        console.log(req.body);    
    }
    next();
}

//WEB ROUTES

app.get("/", printReq, (req, res) => {
    res.render("pages/home", {
        // "sourcesData": sourcesData
    });
});

// app.get("/reader", printReq, (req, res) => {
//     let sourceId = req.query.id;
//     console.log("Received request for source with name = " + sourceId);
//     let sourceData = sourcesData.find(source => {
//         return source.id === sourceId;
//     });
//     console.log("Filtered to source JSON = " + JSON.stringify(sourceData));
//     res.render("pages/reader", {
//         "sourceData": sourceData
//     });
// });

app.get("/books", printReq, (req, res) => {
    res.render("pages/books", {
        // "sourcesData": sourcesData
    });
});

app.get("/songs", printReq, (req, res) => {
    res.render("pages/books", {
        // "sourcesData": sourcesData
    });
});

app.get("/overwrites", printReq, (req, res) => {
    res.render("pages/overwrites", {
        // "overwritesData": overwritesData
    });
});

app.get("/about", printReq, (req, res) => {
    res.render("pages/about");
});

//API ROUTES

// app.get("/source", printReq, (req, res) => {
//     console.log(req.body);
//     res.status(200);
//     res.send(sourcesData);
// });

// app.post("/source", printReq, (req, res) => {
//     console.log(req.body);
//     res.status(200);
//     res.send("DUMMY: source created!");
// });

app.listen(port, () => console.log("Express.js server is listening on port " + port));