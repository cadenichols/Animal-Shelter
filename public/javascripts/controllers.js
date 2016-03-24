'use strict';

var app = angular.module('petApp');

app.controller('petsCtrl', function($scope, petService, ownerService) {
  var animalEdit = '';
  $('.collapse').collapse();

  $scope.rabbits = {};
  $scope.newRabbit = {};
  $scope.updateRabbit = {};

  function getPets() {
    petService.get()
    .then(function(res) {
      $scope.rabbits = res.data;
      $scope.rabbits.forEach(function(rabbit) {
        getOwners(rabbit);
      })
    }, function (err) {
      console.log(err);
    });
  }

  getPets();

  $scope.addRabbit = function () {
    petService.create($scope.newRabbit)
    .then(function (res) {
      $scope.newRabbit = {};
      getPets();
    }, function (err) {
      console.error(err);
    });
  }

  $scope.deleteRabbit = function (idToDelete) {
   petService.remove(idToDelete)
   .then(function (res) {
     getPets();
   }, function (err) {
     console.error(err);
   });
 }

 $scope.editRabbit = function () {
    petService.update(animalEdit, $scope.updateRabbit)
    .then(function (res) {
      $scope.updateRabbit= {};
      getPets();
    }, function (err) {
      console.error(err);
    });
 }

 $scope.clickedEdit = function (rabbitID) {
   animalEdit = rabbitID;
 }

 var getOwners = function (thisRabbit) {
   $scope.guys = [];
   var ownerArr = thisRabbit.owners;
   ownerArr.forEach(function (dude) {
     ownerService.getThisGuy(dude)
     .then(function(res) {
       $scope.guys.push(res.data);
     }, function (err) {
       console.log(err);
     });
   })
}

 $scope.toggleCheckbox = function (thisRabbit) {
   petService.toggleAdopted(thisRabbit._id)
   .then(function(res) {
     $scope.changeCheckbox = res.data.isAdopted;
   }, function (err) {
     console.log(err);
   });
 }
});

app.controller('AccordionDemoCtrl', function ($scope, ownerService) {
  $scope.owners = {};

  function getOwners() {
    ownerService.get()
    .then(function(res) {
      $scope.owners = res.data;
    }, function (err) {
      console.log(err);
    });
  }

  getOwners();
});
