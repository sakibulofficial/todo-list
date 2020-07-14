const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Assalamu Walikum");
});

app.listen(port, function () {
  console.log("server in up and running on port 3000");
});
