'use strict';

const express = require('express');
const app = express();

const clientRouter = require("./routes/clientRouter");

const clientAuthMw = () => (req, res, next) => {
    //console.log("req.client:%O",req);
    if (req.secure && !req.client.authorized) {
        console.log("Client https request didn't include a certificate...returning 401 error.");
        return res.status(401).send('Invalid client cert');
    }
    return next();
};

//app.use(clientAuthMw()); //attach middleware handler for client certificate auth.
app.use("/v1", clientRouter);

module.exports = app;