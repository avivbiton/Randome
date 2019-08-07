function unhandledEndpoint(req, res) {
    res.send("404 - Not Found.");
}

module.exports = unhandledEndpoint;