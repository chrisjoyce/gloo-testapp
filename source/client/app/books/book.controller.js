// book controller
(function() {
	'use strict';

	angular.module('gloo-app.books')
		.controller('BookController', BookController);


	BookController.$inject = ['BookService', '$routeParams'];

	function BookController(BookService, $routeParams) {
		var vm = this;

		vm.title = 'Books!';
		vm.books = [];
		vm.newBook = false;
		vm.deleteBook = deleteBook;

		activateController();

		function activateController() {
			vm.books = BookService.getAll();
		}

		function deleteBook(id) {
			BookService.delete(id).then(DeleteSuccessCB, DeleteFailCB);

			function DeleteSuccessCB() {

			}

			function DeleteFailCB() {

			}

		}
	}


})();