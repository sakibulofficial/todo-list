const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolistDB', {useNewUrlParser: true} ,{ useUnifiedTopology: true });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const itemSchema  = {
  name : String
} 
var Item = mongoose.model("item",itemSchema);

var item1 = new Item({
  name : "code for 1 houre"
});
var item2 = new Item({
  name : "eat breakfast"
});
var item3 = new Item({
  name : "go to sleep"
});


const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err){
  if (err) {
    console.log(err);
  }else{
    console.log("added successfully");
  }
});

// item.save();


app.get("/", function (req, res) {
  res.render("list", { itemTitle: "Today", newListItems: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;

  console.log(req.body);

  if (req.body.list == "Work Day") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { itemTitle: "Work Day", newListItems: workItems });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("server in up and running on port 3000");
});
