const router = require("express").Router();
const ShortURLs = require("../models/ShortURLs");
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
});

router.get("/custom", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/customURLs.html"));
});

router.get("/:id", async (req, res) => {
    //res.send(req.params.id);

    try {
        var url = await ShortURLs.findOne({ shortID: req.params.id });

        if (url) {
            return res.redirect(url.targetURL);
        } else {
            return res.status(404).json("No URL with that ID Found");
        }
    } catch (err) {
        console.log(`[ERROR] Error retrieving by ID:\n ${err}`);
        res.status(500).json("Internal Error");
    }
});

module.exports = router;