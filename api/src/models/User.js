const mongoose = require("mongoose");
const Role = require("./utils");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Role, required: true },
  taxPayerIds: { type: Array, required: false, default: [] },
  stateId: { type: String, required: true },
  panNumber: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(this.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        // document.password = this.password;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    // if (err) {
    //   callback(err);
    // } else {
    callback(err, true);
    // }
  });
};

module.exports = mongoose.model("User", UserSchema);
