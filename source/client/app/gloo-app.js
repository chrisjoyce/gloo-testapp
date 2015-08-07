(function() {
	'use strict';

  angular
  	.module('gloo-app', [

  	// angular related
  	'ngRoute', 'ngMaterial',

  	// app modules
  	'gloo-app.books'//, 'gloo-app.website', 'gloo-app.user',

  	// thirdparty
  	])
  	.config(routeConfiguration);

  routeConfiguration.$inject = ['$routeProvider', '$locationProvider'];

  function routeConfiguration($routeProvider, $locationProvider) {
  	$routeProvider
  		.when('/', { templateUrl: 'app/dashboard/dashboard.html' })
  		.when('/books', {templateUrl: 'app/books/books.html'} )
  		.when('/websites', {})
  		.otherwise({redirectTo: '/'});


  	// get rid of hashbang and use html5 history
  	$locationProvider.html5Mode(true);
  }

})();
