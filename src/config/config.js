const express = require("express");
const path = require("path");

const config = {
  middleware: [
    express.static(path.join(__dirname, "/../../")),
    express.static(path.join(__dirname, "/../../src/auth/rooms")),
    express.static(path.join(__dirname, "/../../src/public")),
    express.static(path.join(__dirname, "/../../src/public/assets")),
    express.static(path.join(__dirname, "/../../src/public/assets/js")),
    express.static(path.join(__dirname, "/../../src/public/assets/css")),
    express.static(path.join(__dirname, "/../../src/public/assets/css/piano")),
    express.static(path.join(__dirname, "/../../src/public/assets/css/index")),
    express.static(path.join(__dirname, "././../src/auth/login")),
    express.json(),
  ],
  port: 8080,
};

module.exports = config;
