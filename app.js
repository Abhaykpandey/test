const express = require("express");

const bodyParser = require("body-parser");

var app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/todo");

const trySchema = new mongoose.Schema({
  name: String,
});

const item = mongoose.model("task", trySchema);

const todo1 = new item({
  name: "Learn DSA",
});

const todo2 = new item({
  name: "Learn React",
});

const todo3 = new item({
  name: "Leart Node",
});

todo1.save();
todo2.save();
todo3.save();

app.get("/", function (req, res) {
  item.find({}, function (err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      res.render("list", { dayej: foundItems });
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.ele1;
  const todo4 = new item({
    name: itemName,
  });
  todo4.save();
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const checked = req.body.checkbox1;
  item.findByIdAndRemove(checked, function (err) {
    if (!err) {
      console.log("deleted");
      res.redirect("/");
    }
  });
});

app.listen(3000, function () {
  console.log("Server started");
});
