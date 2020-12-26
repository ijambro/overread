const express = require("express");
const router = express.Router();

const libraryData = {};

//SHOW LIBRARY

router.get("/", (req, res) => {
    res.render("pages/library", {
        "libraryData": libraryData
    });
});

// HANDLE "ADD TO LIBRARY" ACTION

router.post("/", (req, res) => {
    console.log("ADD TO LIBRARY ACTION!");
    let sourceId = req.params.sourceId;
    let overwriteId = req.params.overwriteId;

    //TODO: Lookup the current user
    //TODO: Add sourceId and overwriteId to the user's library

    res.sendStatus(200);
});

module.exports = router;