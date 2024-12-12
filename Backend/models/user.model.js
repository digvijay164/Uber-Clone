const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  fullname: {
    fullname: {
      type: String,
      require: true,
      minlength: [3, "first name must be at st least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "first name must be at st least 3 characters long"],
    },
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,   
    require: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPasswords = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
