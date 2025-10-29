const express = require("express");
const router = require("./users/users-router");
const middleware = require("./middleware/middleware");
const server = express();
server.use(express.json());
server.use(middleware.logger);
server.use("/api/users", router);

server.get("/", (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
