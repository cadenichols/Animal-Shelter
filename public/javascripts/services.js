'use strict';

var app = angular.module('petApp');

app.service('petService', function($http) {

  this.get = function() {
    return $http.get('/pets');
  };

  this.create = function(pet) {
    return $http.post('/pets', pet);
  };

  this.update = function(petId, updateObj) {
    return $http.put(`/pets/${petId}`, updateObj);
  };

  this.remove = function (id) {
     return $http.delete(`/pets/${id}`);
   };

  this.toggleAdopted = function(petId) {
    return $http.put(`/pets/${petId}/adopted`);
  };

});


app.service('ownerService', function($http) {

  this.getThisGuy = function (id) {
    return $http.get(`/owners/${id}`);
  }

  this.get = function() {
    return $http.get('/owners');
  };
});
