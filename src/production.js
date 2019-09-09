const express = require("express");
const path = require("path");

const initializeProductionBuild = (app) => {
    const combinedPath = path.join(__dirname + "/..", "client", "build");
    console.log(combinedPath);
    app.use(express.static(combinedPath));
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname + "/..", "client", "build", "index.html"));
    });
};

module.exports = { initializeProductionBuild };


