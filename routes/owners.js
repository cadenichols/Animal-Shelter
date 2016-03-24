'use strict';

var express = require('express');
var router = express.Router();
var moment = require('moment');

var Owner = require('../models/owner');

router.get('/', function(req, res, next) {
  Owner.find({}, function(err, owners) {
    if(err) return res.status(400).send(err);
    res.send(owners);
  });
});

router.get('/:id', function(req, res) {
  Owner.findById(req.params.id, function(err, owner) {
    if(err) return res.status(400).send(err);
    res.send(owner);
  });
});

router.post('/', function(req, res) {
  var owner = new Owner(req.body);
  console.log(req.body);
  owner.save(function(err, savedOwner) {
    res.status(err ? 400 : 200).send(err || savedOwner);
  });
});

router.delete('/:id', function (req, res) {
  Owner.remove({_id: req.params.id}, function (err) {
    if(err) {
      res.status(400).send(err);
      return;
    }
    res.send();
  });
});

router.put('/:id', function(req, res) {
  Owner.findByIdAndUpdate(req.params.id,
    { $set: req.body },
    { new: true },
    function(err, owner) {
      res.status(err ? 400 : 200).send(err || owner);
    });
});

module.exports = router;
