const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const itemSchema = {
  name: String
}
var Item = mongoose.model("item", itemSchema);



app.get("/", function (req, res) {


  let itemArray = [];
  Item.find(function (err, result) {

    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < result.length; i++) {
        itemArray.push(result[i]);

      }
    }

    if (result.length === 0) {

      let deafultitem = new Item({
        name: "add a todo "
      });
      deafultitem.save();
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



app.post("/delete", function (req, res) {

  Item.findByIdAndRemove({ _id: req.body.checkbox }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });



});












app.listen(3000, function () {
  console.log("server in up and running on port 3000");
});
