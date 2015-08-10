(function() {
	'use strict';

  angular
  	.module('gloo-app', [

  	// angular related
  	'ngRoute', 'ngMaterial',

  	// app modules
  	'gloo-app.resources',// 'gloo-app.website', 'gloo-app.user',

  	// thirdparty
    'ngMdIcons', 'LocalStorageModule'
  	])
  	.config(routeConfiguration);

  routeConfiguration.$inject = ['$routeProvider', '$locationProvider', 'localStorageServiceProvider', '$mdThemingProvider'];

  function routeConfiguration($routeProvider, $locationProvider, localStorageServiceProvider, $mdThemingProvider) {
  	// $routeProvider
  	// 	.when('/', { templateUrl: 'app/dashboard/dashboard.html' })
   //    .when('/books/new', {
   //      templateUrl: 'app/books/book.form.html',
   //      controller: 'BookNewController',
   //      controllerAs: 'vm'
   //    })
   //    .when('/books/:title', {
   //      templateUrl: 'app/books/book.form.html',
   //      controller: 'BookUpdateController',
   //      controllerAs: 'vm'
   //    })
   //    .when('/books', {
   //      templateUrl: 'app/books/books.html',
   //      controller: 'BookController',
   //      controllerAs: 'vm'
   //    })
  	// 	// .when('/books/new', {
  	// 	// 	templateUrl: 'app/books/book.form.html',
  	// 	// 	controler: 'BookNewController',
  	// 	// 	controllerAs: 'vm'
  	// 	// })
  	// 	.when('/websites', {})
  	// 	.otherwise({redirectTo: '/'});

    localStorageServiceProvider.setPrefix('ls');

  	// get rid of hashbang and use html5 history
  	$locationProvider.html5Mode(true);

    $mdThemingProvider.theme('default')
                          .primaryPalette('brown')
                          .accentPalette('red');
  }

})();
