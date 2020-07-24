const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolistDB', { useNewUrlParser:  true, useUnifiedTopology: true });


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const itemSchema = {
  name: String
}
var Item = mongoose.model("item", itemSchema);

var item1 = new Item({
  name: "code for 1 houre"
});
var item2 = new Item({
  name: "eat breakfast"
});
var item3 = new Item({
  name: "go to sleep"
});


const defaultItems = [item1, item2, item3];



// item.save();




app.get("/", function (req, res) {


  let itemArray = [];
  Item.find(function (err, result) {

    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < result.length; i++) {
        itemArray.push(result[i].name);

      }
    }

    if (result.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("added successfully");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { itemTitle: "Today", newListItems: itemArray });
    }

  });

});

app.post("/", function (req, res) {
  const newItem = req.body.newItem;

  var item = new Item({
    name: newItem
  });

  item.save();

  res.redirect("/");




});














app.listen(3000, function () {
  console.log("server in up and running on port 3000");
});
