'use strict';

var app = angular.module('petApp');

app.controller('petCtrl', function($scope) {

  // petService.getUpcoming()
  // .then(function (res) {
  //   console.log("getUpcoming", res);
  //   $scope.appointments = res.data;
  // }, function (err) {
  //   console.error(err);
  // })

});


app.controller('petsCtrl', function($scope, petService, ownerService) {
  var animalEdit = '';
  $('.collapse').collapse();

  $scope.rabbits = {};
  $scope.newRabbit = {};
  $scope.updateRabbit = {};
  $scope.guys = [];

  function getPets() {
    petService.get()
    .then(function(res) {
      $scope.rabbits = res.data;
    }, function (err) {
      console.log(err);
    });
  }

  getPets();
  getOwners();

  $scope.addRabbit = function () {
    console.log($scope.newRabbit);
    petService.create($scope.newRabbit)
    .then(function (res) {
      $scope.newRabbit = {};
      getPets();
    }, function (err) {
      console.error(err);
    });
  }

  $scope.deleteRabbit = function (idToDelete) {
    console.log(idToDelete);
   petService.remove(idToDelete)
   .then(function (res) {
     getPets();
   }, function (err) {
     console.error(err);
   });
 }

 $scope.editRabbit = function () {
    console.log("clicked!");
    petService.update(animalEdit, $scope.updateRabbit)
    .then(function (res) {
      console.log("edited");
      $scope.updateRabbit= {};
      getPets();
    }, function (err) {
      console.error(err);
    });
 }

 $scope.clickedEdit = function (rabbitID) {
   animalEdit = rabbitID;
 }

 getOwners = function (thisRabbit) {
   //for each owner in ownerArr, send a get request to the Client
   console.log("clicked to get owners");
   console.log(thisRabbit);
   var ownerArr = thisRabbit.owners;
   ownerArr.forEach(function (dude) {
     ownerService.getThisGuy(dude)
     .then(function(res) {
       console.log("each guy", res.data);
       $scope.guys.push(res.data);
     }, function (err) {
       console.log(err);
     });
   })
   //$scope.guys = ownerArr;
}

 $scope.toggleCheckbox = function (thisRabbit) {
   petService.toggleAdopted(thisRabbit._id)
   .then(function(res) {
     console.log("changed");
     console.log(res.data.isAdopted);
     $scope.changeCheckbox = res.data.isAdopted;
   }, function (err) {
     console.log(err);
   });
 }

});





app.controller('AccordionDemoCtrl', function ($scope, ownerService) {
  //$scope.oneAtATime = true;

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

  // $scope.groups = [
  //   {
  //     title: 'Dynamic Group Header - 1',
  //     content: 'Dynamic Group Body - 1'
  //   },
  //   {
  //     title: 'Dynamic Group Header - 2',
  //     content: 'Dynamic Group Body - 2'
  //   }
  // ];

  // $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  // $scope.addItem = function() {
  //   var newItemNo = $scope.items.length + 1;
  //   $scope.items.push('Item ' + newItemNo);
  // };

  // $scope.status = {
  //   isFirstOpen: true,
  //   isFirstDisabled: false
  // };
});
