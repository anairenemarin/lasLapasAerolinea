const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  rol: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  name: String,
  lastName: String,
  email: String,
  birthday: String,
  address: String,
  work_phone: String,
  cellphone: String,
});

UserSchema.pre("save", function (next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = async (passw, userPassw, cb) => {
  bcrypt.compare(passw, userPassw, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const UserModel = model("User", UserSchema);

module.exports = UserModel;
