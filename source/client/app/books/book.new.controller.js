// book controller
(function() {
	'use strict';

	angular.module('gloo-app.books')
		.controller('BookNewController', BookNewController);


	BookNewController.$inject = ['BookService', '$routeParams', '$location', '$mdToast'];

	function BookNewController(BookService, $routeParams, $location, $mdToast) {
		var vm = this;

		vm.title = 'Add a Book!';
		vm.newBook = true;
		vm.addBook = addBook;

		if ($routeParams.id === 'new') {
			vm.newBook = true;
		}

		activateController();

		function activateController() {
			vm.book = {title: "", author: "", ISBN:""};
		}

		function addBook() {

			BookService.create(vm.book).then(AddBookSuccessCB,AddBookFailCB);

			function AddBookSuccessCB(resp) {
				console.log("success");
				vm.books = resp.data;


			var toast = $mdToast.simple()
          .content('Book saved to library!')
          .action('OK')
          .highlightAction(true)
          .position('bottom')
          .hideDelay(0);

		    $mdToast.show(toast).then(function(response) {
		    	$location.path('books/');
		    });

			}

			function AddBookFailCB(resp) {
				console.log(resp);
			}

		 }
	}
})();