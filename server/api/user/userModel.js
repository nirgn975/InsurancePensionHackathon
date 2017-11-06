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
  cardNumber: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  expMonth: {
    type: String,
    required: true,
  },
  expYear: {
    type: String,
    required: true,
  },
  dates: {
    registrationDate: {
      type: Date,
      required: true,
    },
    expectedDataDate: {
      type: Date,
      required: true,
    },
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

  // Hash the passwords.
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
