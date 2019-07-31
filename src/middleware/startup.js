const express = require("express");
const logger = require("morgan");

const useMiddleware = (app) => {
	app.use(logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
};

module.exports = { useMiddleware };