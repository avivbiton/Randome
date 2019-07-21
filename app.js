const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  serveProductionBuild();
}

app.use('/', indexRouter);

// catch 404
app.use(function (req, res, next) {
  res.send("404 - Not Found.");
});

// error handler
app.use(function (err, req, res, next) {

  const errorMessage = process.env.NODE_ENV !== "development" ? "Internal Server Error" : `${err.message}\nStack: ${err.stack}`;
  res.status(err.status || 500);
  res.send(errorMessage);
});

function serveProductionBuild() {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}


