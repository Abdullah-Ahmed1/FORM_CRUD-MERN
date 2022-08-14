const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/Task",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("connected successfully with database");
    } else {
      console.log("error in connection " + err);
    }
  }
);

module.exports = mongoose.connect;
require("../models/form.model");
