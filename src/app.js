require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./database/db");

// Connect to the database
db.then(() => console.log(`Connected to MongoDB!`)).catch(err => console.log(`[ERROR] Database Login Error:\n${err}`));

// This seems to be required to use json in the express requests.
app.use(express.json({ extended: false }));
// This is used to parse URL Encoded bodies sent by HTML forms.
app.use(express.urlencoded({ extended: false }));

// Routes
const baseRoute = require("./routes/base");
const apiRoute = require("./routes/api");

// Routers
app.use("/", baseRoute);
app.use("/api", apiRoute);

// Listen on the base port
app.listen(PORT, () => {
    console.log(`URL Shortener Backend Listening on port: ${PORT}`);
});