import mongoose from "mongoose";

import mongodbConfig from "../config/mongodb.config.js";

const {
    db: { host, port, name },
} = mongodbConfig;

const envDatabase = {
    dev: `mongodb://${host}:${port}/${name}`,
    pro: ``,
};

const connectString = envDatabase[process.env.NODE_ENV];

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.set("debug", true);
        mongoose.set("debug", { color: true });

        mongoose
            .connect(connectString)
            .then(() => {
                console.log("Connected to Mongodb");
            })
            .catch((err) => {
                console.log("Error connecting to Mongodb", err);
            });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongo = Database.getInstance();

export default instanceMongo;
