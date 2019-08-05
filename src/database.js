const mongoose = require("mongoose");
const connectionURL = process.env.DB_CONNECTION_STRING;

const connectionOptions = {
	useNewUrlParser: true,
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 1000, // Reconnect every 500m
	poolSize: 10, // Maintain up to 10 socket connections
	bufferMaxEntries: 0,
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4 // Use IPv4, skip trying IPv6
};

const initializeConnection = async () => {
	try {
		await mongoose.connect(connectionURL, connectionOptions);
		bindHandlers(mongoose.connection);
		console.log("Mongoose Connected.");
	} catch (error) {
		console.error("Mongoose initial connection failed.");
		console.error(error);
	}
};

const bindHandlers = (connection) => {
	connection.on("error", error => {
		// TODO: addd loggin method
		console.error(error);
	});
};

module.exports = { initializeConnection };