import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import indexRoute from "./routers/index.js";

const app = express();

// Init middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Init databases
import "./databases/mongodb.init.js";

// Init routers
app.use("/v1/api", indexRoute);

// Handle errors
app.use((req, res, next) => {
    const error = new Error("Resource Not found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        status: "Error",
        code: statusCode,
        message: err.message || "Internal Server Error",
    });
});

export default app;
