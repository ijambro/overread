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
    res.render("pages/sources", {
        "sourcesData": sourcesData
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

    res.render("pages/source", {
        "sourceData": sourceData
    });
});

module.exports = router;