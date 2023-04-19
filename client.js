const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

app.get("/", (_req, res) => {
    res.sendFile("./public/home.html", { root: __dirname });
});

app.listen(3000, function () {
    console.log("Client listening on port 3000");
});
