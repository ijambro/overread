const express = require("express");
const router = express.Router();

const Source = require("../models/Source.js");
const sourcesData = require("../data/sources.json");

//const controller =

// router.post('/users/create', controller.create)
// router.put('/users/:userId', controller.update)
// router.get('/users', controller.getAll)

router.get("/", (req, res) => {
    let type = req.params.type;
    console.log("Requested sources with type = " + type);
    let sourceData = sourcesData.filter(t => {
        return t.type === t;
    });
    console.log("Filtered to sources JSON = " + JSON.stringify(sourcesData));

    res.render("pages/books", {
        "sourcesData": sourcesData
    });
});


// CREATING SOURCES

router.get("/add", (req, res) => {
    res.render("pages/create-source");
});

router.post("/", (req, res) => {
    console.log("SOURCE FORM SUBMITTED!");
    res.render("pages/books", {
        "sourcesData": sourcesData
    });
});

module.exports = router;