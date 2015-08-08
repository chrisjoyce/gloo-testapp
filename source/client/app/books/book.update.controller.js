// book controller
(function() {
	'use strict';

	angular.module('gloo-app.books')
		.controller('BookUpdateController', BookUpdateController);


	BookUpdateController.$inject = ['BookService', '$routeParams', '$location', '$mdToast'];

	function BookUpdateController(BookService, $routeParams, $location, $mdToast) {
		var vm = this;

		vm.title = 'Update';
		vm.newBook = false;
		vm.updateBook = updateBook;
		vm.getBook = getBook;

		vm.bookTitle = $routeParams.title;

		activateController();

		function activateController() {
		    return getBook();
		}

		function getBook() {
	    return BookService.get(vm.bookTitle)
	        .then(function(book){
            vm.book = book;
            return vm.book;
	        });
		}

		function updateBook() {

			BookService.update(vm.book).then(UpdateBookSuccessCB,UpdateBookFailCB);

			function UpdateBookSuccessCB(resp) {
				console.log("success");
				vm.books = resp.data;


				var toast = $mdToast.simple()
	          .content('Book updated in library!')
	          .action('OK')
	          .highlightAction(true)
	          .position('bottom')
	          .hideDelay(0);

			    $mdToast.show(toast).then(function(response) {
			    	$location.path('books/');
			    });

			}

			function UpdateBookFailCB(resp) {
				console.log(resp);
			}

		 }
	}
})();