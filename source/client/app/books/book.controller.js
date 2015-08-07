// book controller
(function() {
	'use strict';

	angular.module('gloo-app.books')
		.controller('BookController', BookController);


	BookController.$inject = ['BookService'];

	function BookController(BookService) {
		var vm = this;

		vm.title = 'Books!';
		vm.books = [];


		activateController();

		function activateController() {
			vm.books = BookService.getAll();
		}
	}


})();