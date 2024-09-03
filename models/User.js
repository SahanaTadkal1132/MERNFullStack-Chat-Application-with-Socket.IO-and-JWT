const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Your good name please!!",
    },
    email: {
      type: String,
      required: "Email is required!",
    },
    password: {
      type: String,
      required: "Password for privacy is must !!",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);