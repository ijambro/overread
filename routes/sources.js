const express = require("express");
const router = express.Router();

const Source = require("../models/Source.js");
const sourcesData = require("../data/sources.json");
const Overwrite = require("../models/Overwrite.js");
const overwritesData = require("../data/overwrites.json");

//const controller =

// router.post('/users/create', controller.create)
// router.put('/users/:userId', controller.update)
// router.get('/users', controller.getAll)

let nextSourceId = 1100;
let nextOverwriteId = 2100;

//SHOW ALL SOURCES BY TYPE

router.get("/", (req, res) => {
    let type = req.query.type;
    console.log("Requested sources with type = " + type);
    let filteredSourcesData = sourcesData;
    if (type) {
        filteredSourcesData = sourcesData.filter(s => {
            return s.type === type;
        });
        console.log("Filtered to sources JSON = " + JSON.stringify(filteredSourcesData));
    }

    res.render("pages/sources", {
        "sourcesData": filteredSourcesData,
        "sourceType": type
    });
});

//SHOW SOURCE BY ID

router.get("/:id(\\d+)", (req, res) => {
    const id = req.params.id;
    console.log("Requested source by ID = " + id);
    let sourceData = {};
    if (id) {
        sourceData = sourcesData.find(s => {
            return s.id == id;
        });
        console.log("Found source JSON = " + JSON.stringify(sourceData));    
    }

    // Get all overwrites of this source
    let filteredOverwritesData = {};
    if (sourceData) { // sourceData will be undefined if there was no id or no matching source
        filteredOverwritesData = overwritesData.filter(o => {
            return o.sourceId == id;
        });
        console.log("Found " + filteredOverwritesData.length + " overwrites for this source");
    }

    res.render("pages/source", {
        "sourceData": sourceData,
        "overwritesData": filteredOverwritesData,
    });
});

// SHOW "CREATE SOURCE" FORM

router.get("/add", (req, res) => {
    res.render("pages/create-source");
});

// SUBMIT "CREATE SOURCE" FORM

router.post("/", (req, res) => {
    console.log("Submitted: Create Source");

    let sourceType = req.body["source-type"];

    let newSourceObj = new Source(
        nextSourceId++,     //id
        sourceType,         //type
        req.body.title,     //title
        req.body.author,    //author
        "Children's",       //genre
        req.body.coverImageUrl, //coverImageUrl
        "A Friendly New User",  //userName
        req.body["source-text"] //text
    );
    console.log("Creating Source: ");
    console.log(newSourceObj);

    sourcesData.push(newSourceObj);

    if (sourceType) {
        filteredSourcesData = sourcesData.filter(s => {
            return s.type === sourceType;
        });
        console.log("Filtered to sources JSON = " + JSON.stringify(filteredSourcesData));
    }

    res.render("pages/sources", {
        "sourcesData": filteredSourcesData,
        "sourceType": sourceType
    });
});

// SHOW "CREATE OVERWRITE" FORM (for given source)

router.get("/:id(\\d+)/overwrites/add", (req, res) => {
    const id = req.params.id;
    console.log("Create Overwrite of source with ID = " + id);
    let sourceData = {};
    if (id) {
        sourceData = sourcesData.find(s => {
            return s.id == id;
        });
        console.log("Found source JSON = " + JSON.stringify(sourceData));    
    }

    res.render("pages/create-overwrite", {
        "sourceData": sourceData
    });
});

// SUBMIT "CREATE OVERWRITE" FORM (for given source)

router.post("/:id(\\d+)/overwrites", (req, res) => {
    const id = req.params.id;
    console.log("Submitted: Create Overwrite of source with ID = " + id);
    let sourceData = {};
    if (id) {
        sourceData = sourcesData.find(s => {
            return s.id == id;
        });
        console.log("Found source JSON = " + JSON.stringify(sourceData));    
    }

    let newOverwriteObj = new Overwrite(
        nextOverwriteId++, //id
        id,             //sourceId
        null,           //parentId
        req.body.type,  //type
        req.body.title, //title
        "Children's",   //genre
        "A Friendly New User",  //userName
        req.body["text"]    //text
    );
    console.log("Creating Overwrite: ");
    console.log(newOverwriteObj);

    overwritesData.push(newOverwriteObj);

    // Get all overwrites of this source
    let filteredOverwritesData = {};
    if (sourceData) { // sourceData will be undefined if there was no id or no matching source
        filteredOverwritesData = overwritesData.filter(o => {
            return o.sourceId == id;
        });
        console.log("Found " + filteredOverwritesData.length + " overwrites for this source");
    }
    
    res.render("pages/source", {
        "sourceData": sourceData,
        "overwritesData": filteredOverwritesData,
    });
});

module.exports = router;