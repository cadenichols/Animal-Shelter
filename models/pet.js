'use strict';

var mongoose = require('mongoose');

var petSchema = new mongoose.Schema({
  name: String,
  details: String,
  image: String,
  abandonedSince: Date,
  owners:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner'}],
  createdAt: { type: Date, default: Date.now },
  isAdopted: { type: Boolean, default: false }
});

var Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
