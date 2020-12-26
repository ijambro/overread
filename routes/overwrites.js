const express = require("express");
const router = express.Router();

const Overwrite = require("../models/Overwrite.js");
const overwritesData = require("../data/overwrites.json");

// const controller =
// router.post('/users/create', controller.create)
// router.put('/users/:userId', controller.update)
// router.get('/users', controller.getAll)

router.get("/", (req, res) => {
    res.render("pages/overwrites", {
        "overwritesData": overwritesData
    });
});

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

router.get("/add", (req, res) => {
    res.render("pages/create-overwrite");
});

router.post("/", (req, res) => {
    console.log("OVERWRITE FORM SUBMITTED!");
    res.render("pages/overwrites", {
        // "overwritesData": overwritesData
    });
});

module.exports = router;