import express = require("express");
import http from "http";
import { API_PORT, API_URL } from "./config";
import { attachPages } from "./api/";

export function prepareServer(): http.Server {
    const app = express();
    const server = http.createServer(app);

    attachPages(app);

    return server;
}

export function startServer() {
    const server = prepareServer();
    server.listen(API_PORT, () => {
        console.log('Server listening on:', API_URL);
    });
}

// Vypocet hashu ... zmizne odtialto coskoro
// const saltRounds = 10;

// bcrypt.hash("JS_FIIT", saltRounds, function(err, hash) {
//     console.log("JS_FIIT : " + hash);
// });

// bcrypt.hash("JD_FIIT", saltRounds, function(err, hash) {
//     console.log("JD_FIIT : " + hash);
// });