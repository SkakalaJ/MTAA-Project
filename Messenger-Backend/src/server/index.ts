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