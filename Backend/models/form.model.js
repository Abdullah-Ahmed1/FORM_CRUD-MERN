const mongoose = require("mongoose");
var formSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  profession: {
    type: String,
  },
  dob: {
    type: String,
  },
  height: {
    type: Number,
  },

  image: {
    type: String,
  },
  gender: {
    type: String,
  },
});
mongoose.model("Forms", formSchema);
