const mongoose = require("mongoose");

var User = mongoose.model("User", {
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true }
});

module.exports = User;
