const express = require("express");
const router = express.Router();

const Source = require("../models/Source.js");
const sourcesData = require("../data/sources.json");

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
        "sourcesData": filteredSourcesData
    });
});

//SHOW SOURCE BY ID

router.get("/:id(\\d+)", (req, res) => {
    const id = req.params.id;
    console.log("Requested source by ID = " + id);
    let sourceData = sourcesData.filter(s => {
        return s.id === id;
    });
    console.log("Filtered to sources JSON = " + JSON.stringify(sourceData));

    res.render("pages/source", {
        "sourceData": sourceData
    });
});

// SHOW "ADD SOURCE" FORM

router.get("/add", (req, res) => {
    res.render("pages/create-source");
});

// SUBMIT "ADD SOURCE" FORM

router.post("/", (req, res) => {
    console.log("SOURCE FORM SUBMITTED!");
    res.render("pages/sources", {
        "sourcesData": sourcesData
    });
});

module.exports = router;