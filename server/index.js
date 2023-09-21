// start your server and attach any middleware here

const express = require("express");
const server = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = 8080;
// const jwt = require("jsonwebtoken");
// const { COOKIE_SECRET } = require("./secrets");

// init cors
server.use(cors());

// logging middleware
server.use(morgan("dev"));

// init body-parser
const bodyParser = require("body-parser");
server.use(bodyParser.json());

// connect to the client
const client = require("./db/client");
// const cookieParser = require("cookie-parser");
// const { authRequired } = require("./api/utils");

// init cooke-parser
// server.use(cookieParser(COOKIE_SECRET));

client.connect().then(() => console.log("connected"));

server.get("/", (req, res) => {
  res.send("Hello World!");
});

// server.get("/test", authRequired, (req, res, next) => {
//   res.send("You are authorized");
// });

// Router: /api
server.use("/api", require("./api"));

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
