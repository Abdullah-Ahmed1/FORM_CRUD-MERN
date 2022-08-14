const express = require("express");
const cors = require("cors");
const app = express();
require("./connection/connection");
const Mongoose = require("mongoose");
const form = Mongoose.model("Forms");
const bodyParser = require("body-parser"); //Used for parsing request body
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded());
app.use(cors());

/////////////////////////////    Add            /////////////////////////////////////////////////////////////------------------------------------------
app.post("/add", (req, res) => {
  console.log("REACHED");
  console.log("----------------------", req.body);
  form
    .create(req.body)
    .then((res) => {
      console.log("created", res);
    })
    .catch((err) => {
      console.log(err);
    });
});

///////////////////////////   FindAll    /////////////////////////////////////----------------------------------------------------------------------

app.get("/all", async (req, res) => {
  const data = await form.find();

  if (!data) return res.send("no data to show");
  res.json(data);
});
//////////////////////////////   Delete ////////////////////////////////////////////////////////////

app.delete("/delete/:id", async (req, res) => {
  console.log(req.params, "reached--------------------------------");
  const id = req.params.id;
  const element = await form.findOneAndDelete({ _id: id });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(8081, () => {
  console.log("Your server is running on port 8081");
});
