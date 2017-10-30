const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  salt: {
    type: String,
    select: false,
  },
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  this.password = this.encryptPassword(this.password);
  next();
});

UserSchema.methods = {
  // Check the passwords on sign-in.
  authenticate: (password, userPassword) => {
    return bcrypt.compareSync(password, userPassword);
  },

  // hash the passwords
  encryptPassword: (plainTextPword) => {
    if (!plainTextPword) return '';

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainTextPword, salt);
  },

  toJson: function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  },
};

module.exports = mongoose.model('user', UserSchema);
