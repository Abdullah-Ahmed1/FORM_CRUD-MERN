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

formSchema.set("toObject", { virtuals: true });
formSchema.set("toJSON", { virtuals: true });

formSchema
  .virtual("fullname")
  .get(function () {
    return this.firstname + " " + this.lastname;
  })
  .set(function (newName) {
    var nameParts = newName.split(" ");
    this.firstname = nameParts[0];
    this.lastname = nameParts[1];
  });

mongoose.model("Forms", formSchema);
