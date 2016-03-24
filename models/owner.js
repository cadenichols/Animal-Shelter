'use strict';

var mongoose = require('mongoose');

var ownerSchema = new mongoose.Schema({
  name: String,
  image: String,
  phoneNumber: String,
  createdAt: { type: Date, default: Date.now },
});

var Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
