const router = require("express").Router();
const shortid = require("shortid");
const validURL = require("valid-url");
const ShortURLs = require("../models/ShortURLs");

router.get("/", (req, res) => {
    res
        .status(403)
        .send("<h1>Forbidden</h1>");
});

router.post("/url/shorten", async (req, res) => {
    //res.json(req.body.targetURL);
    var targetURL = req.body.targetURL;
    var baseURL = process.env.BASE_URL || "http://localhost:3000";

    if (!validURL.isUri(baseURL)) {
        res.status(400).json("Base URL is Invalid.");
    }

    if (validURL.isUri(targetURL)) {
        try {
            if (req.body.shortID) {
                var alreadyExists = await ShortURLs.findOne({ shortID: req.body.shortID });

                if (!alreadyExists) {
                    shortenedID = req.body.shortID;

                    let generatedURL = `${baseURL}/${shortenedID}`;

                    url = new ShortURLs({
                        targetURL: targetURL,
                        shortID: shortenedID
                    });

                    await url.save();

                    res.status(201).json(url);
                    return;
                } else {
                    res.status(409).json("The requested ID is already in use.");
                    return;
                }
            } else {
                var url = await ShortURLs.findOne({ targetURL: targetURL })

                if (url) {
                    res.status(200).json(url);
                } else {
                    var shortenedID;

                    shortenedID = shortid.generate();

                    let generatedURL = `${baseURL}/${shortenedID}`;

                    url = new ShortURLs({
                        targetURL: targetURL,
                        shortID: shortenedID
                    });

                    await url.save();

                    res.status(201).json(url);
                }
            }
        } catch (err) {
            console.log(`[ERROR] Internal Error Shortening URL:\n ${err}`);
            res.status(500).json(`Internal Error`);
        }
    } else {
        res.status(400).json("Target URL is not a valid URL");
    }
});

module.exports = router;