const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  name: String,
  email: String,
});

module.exports = mongoose.model("User", userSchema);