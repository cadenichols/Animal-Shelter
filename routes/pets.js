'use strict';

var express = require('express');
var router = express.Router();
var moment = require('moment');

var Pet = require('../models/pet');
var Owner = require('../models/owner')

router.get('/', function(req, res, next) {
  Pet.find({}, function(err, pets) {
    if(err) return res.status(400).send(err);
    res.send(pets);
  });
});

router.post('/', function(req, res) {
  var pet = new Pet(req.body);
  console.log(req.body);
  pet.save(function(err, savedPet) {
    res.status(err ? 400 : 200).send(err || savedPet);
  });
});

router.delete('/:id', function (req, res) {
  Pet.remove({_id: req.params.id}, function (err) {
    if(err) {
      res.status(400).send(err);
      return;
    }
    res.send();
  });
});

//toggle adopted
router.put('/:id/adopted', function (req, res) {
  Pet.findById(req.params.id, function (err, pet) {
    if(err) return res.status(400).send(err);
    pet.isAdopted = !pet.isAdopted;
    pet.save(function (err,savedPet) {
      res.status(err ? 400 : 200).send(err || savedPet);
    });
  });
});

router.put('/:petId/addOwners', function (req, res) {
  Pet.findById(req.params.petId, function (err, pet) {
    if(err || !pet) return res.status(400).send(err || 'Pet not found.');

    Owner.find({_id: { $in: req.body.ownerIds } }, function(err, owners) {
      if(err) return res.status(400).send(err);

      var ownerIds = owners.map(owner => owner._id);
      pet.owners = pet.owners.concat(ownerIds);

      pet.save(function (err, savedPet) {
        res.status(err ? 400 : 200).send(err || savedPet);
      });
    });
  });
});

// router.put('/:petId/deleteOwners', function (req, res) {
//   Pet.findById(req.params.petId, function (err, pet) {
//     if(err || !pet) return res.status(400).send(err || 'Pet not found.');
//
//     Owner.find({_id: { $in: req.body.ownerIds } }, function(err, owners) {
//       if(err) return res.status(400).send(err);
//
//       console.log("res", owners);
//       var ownerIds = owners.map(owner => owner._id);
//       console.log("map", ownerIds);
//       ownerIds.forEach(function(id) {
//         pet.owners.splice(pet.owners.indexOf(id), 1);
//       })
//       console.log("final",pet.owners);
//
//       pet.save(function (err, savedPet) {
//         res.status(err ? 400 : 200).send(err || savedPet);
//       });
//     });
//   });
// });

router.put('/:id', function(req, res) {
  Pet.findByIdAndUpdate(req.params.id,
    { $set: req.body },
    { new: true },
    function(err, pet) {
      res.status(err ? 400 : 200).send(err || pet);
    });
});

module.exports = router;
