require("dotenv").config();

const express = require ("express");
const cors = require("cors");
const app = express();

const database = require("./config/database");
const todasAsRoutes = require("./routes/todasAsRoutes");
const indexRouter = require("./routes/indexRoutes");

app.use(express.json());
app.use(cors());

app.use("/user", todasAsRoutes);
app.use("/dados", todasAsRoutes);

database.connect();

app.use(indexRouter);

module.exports = app;
