'use strict';

const express = require('express');
const app = express();

const clientRouter = require("./routes/clientRouter");

app.use("/v1", clientRouter);

module.exports = app;