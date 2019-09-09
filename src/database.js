const mongoose = require("mongoose");
const connectionURL = process.env.DB_CONNECTION_STRING;

const Randomizer = require("./Models/Randomizer");
const seedSchema = require("./seedingSchema.json");

const logger = require("./services/logger");

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
        logger.info("Mongoose Connected.");
        //seedDatabase();
        console.log("Database connected successfully.");
    } catch (error) {
        logger.error(`Mongoose initial connection failed. ${error}`);
    }
};

const seedDatabase = async () => {
    if (await Randomizer.count() < 50) {
        let failCount = 0;
        console.log("Seeding database");
        console.time("seed");
        for (let i = 0; i < 100; i++) {
            try {
                const newRandomizer = new Randomizer({
                    name: makeid(25),
                    description: "DESC GOES HERE. JUST PLACE HOLDER FOR NOW. IGNORE THIS",
                    jsonSchema: JSON.stringify(seedSchema),
                    owner: {
                        name: "Randome",
                        id: "Admin_ID"
                    }
                });
                await newRandomizer.save();
            } catch (error) {
                failCount++;
                console.error(error);
            }
        }
        console.timeEnd("seed");
        console.log("Fail count: " + failCount);
    }
};

function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const bindHandlers = (connection) => {
    connection.on("error", error => {
        logger.error(`MongoDB connection error: ${error}`);
    });
};

module.exports = { initializeConnection };