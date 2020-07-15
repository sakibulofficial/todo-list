const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  var options = { weekday: "long", day: "numeric", month: "long" };
  var today = new Date();
  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { mDay: day });
  res.send();
});

app.post("/", function (req, res) {
  console.log(req.body.newItem);
});

app.listen(3000, function () {
  console.log("server in up and running on port 3000");
});
