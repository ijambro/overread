const express = require("express");
const router = express.Router();

const Source = require("../models/Source.js");
const sourcesData = require("../data/sources.json");
const Overwrite = require("../models/Overwrite.js");
const overwritesData = require("../data/overwrites.json");

//Unused
router.get("/", (req, res) => {
    res.render("pages/overwrites", {
        "overwritesData": overwritesData
    });
});

//Unused
router.get("/:id(\\d+)", (req, res) => {
    const id = req.params.id;
    console.log("Requested overwrite by ID = " + id);
    let overwriteData = overwritesData.filter(o => {
        return o.id === id;
    });
    console.log("Filtered to overwrite JSON = " + JSON.stringify(overwriteData));

    res.render("pages/overwrites", {
        "overwritesData": overwriteData
    });
});

//Deprecated - using /source/:id/overwrites/add instead
router.get("/add", (req, res) => {
    const sourceId = req.query.sourceId;
    console.log("Requested to overwrite source with id = " + sourceId);
    let sourceData = {};
    if (sourceId) {
        sourceData = sourcesData.find(s => {
            return s.id == sourceId;
        });
        console.log("Found source JSON = " + JSON.stringify(sourceData));    
    }

    res.render("pages/create-overwrite", {
        "sourceData": sourceData
    });
});

//Deprecated - using /source/:id/overwrites instead
router.post("/", (req, res) => {
    console.log("OVERWRITE FORM SUBMITTED!");
    res.render("pages/overwrites", {
        // "overwritesData": overwritesData
    });
});

module.exports = router;