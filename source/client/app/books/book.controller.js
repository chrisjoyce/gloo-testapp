// book controller
(function() {
	'use strict';

	angular.module('gloo-app.books')
		.controller('BookController', BookController);


	BookController.$inject = ['BookService', '$routeParams', '$mdSidenav', '$mdToast', 'localStorageService', '$mdMedia'];

	function BookController(BookService, $routeParams, $mdSidenav, $mdToast, localStorageService, $mdMedia) {
		var vm = this;

		vm.types = ['web','book'];

		vm.title = 'Books!';
		vm.books = [];
		vm.book = null;
		vm.newBook = false;
		vm.bookIndex = -1;

		vm.deleteBook = deleteBook;
		vm.toggleBookList = toggleBookList;
		vm.selectBook = selectBook;
		vm.addBook = addBook;
		vm.saveBook = saveBook;
		vm.navigateTo = navigateTo;

		activateController();

		function activateController() {
			return getBooks();
		}

		function getBooks() {
			return BookService.getAll()
				.then(function(books){
					vm.books = books;
				});
		}

		function deleteBook() {
			BookService.delete(vm.bookIndex).then(DeleteSuccessCB, DeleteFailCB);

			function DeleteSuccessCB(books) {
				vm.books = books;
				vm.book = null;
				vm.bookIndex = -1;

				$mdToast.show(
		      $mdToast.simple()
		        .content('That resource has been demolished!!!')
		        .position('bottom right')
		        .hideDelay(3000)
		    );
			}

			function DeleteFailCB() {
				$mdToast.show(
		      $mdToast.simple()
		        .content('I had some trouble demolishing that resouce?!?!?!')
		        .position('bottom right')
		        .hideDelay(3000)
		    );
			}
		}

		function selectBook(book, index) {
			vm.book = book;
			vm.bookIndex = index;
			vm.newBook = false;
			if (!$mdMedia('gt-sm')) {
				$mdSidenav('left').close();
			}

		}

		function toggleBookList() {
			$mdSidenav('left').toggle();
		}


		// add a new book
		function addBook() {
			vm.book = {};
			vm.newBook = true;
		}

		// save the book from UI
		function saveBook() {
			BookService.create(vm.book).then(AddBookSuccessCB,AddBookFailCB);

			function AddBookSuccessCB(books) {
				vm.books = books;

				$mdToast.show(
		      $mdToast.simple()
		        .content('New resource added to library!')
		        .position('bottom right')
		        .hideDelay(3000)
		    );

			}

			function AddBookFailCB(resp) {
				$mdToast.show(
		      $mdToast.simple()
		        .content('Error adding new resource to library!')
		        .position('bottom right')
		        .hideDelay(3000)
		    );
		  }
		}

		function navigateTo() {
			window.open(vm.book.url, "Some Place");
		}
	}

})(); // end of module