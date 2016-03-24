'use strict';

var app = angular.module('petApp', ['ui.router','ui.bootstrap']);

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {url: '/', templateUrl: '/html/home.html'})
	.state('pets', {url: '/pets', templateUrl: '/html/pets.html', controller: 'petsCtrl'})
	.state('owners', {url: '/owners', templateUrl: '/html/owners.html', controller:'AccordionDemoCtrl'})
  $urlRouterProvider.otherwise('/');
})

// app.run(function(petService) {
//
// });
