(function() {

	angular.module('gloo-app.books')
		.factory('BookService', BookService);


	BookService.$inject = ['$http', '$q', 'localStorageService'];


	function BookService($http, $q, localStorageService) {
		var resourcesInStore = localStorageService.get('resources');

		var books = resourcesInStore || [
				{title: 'Design Patterns', author: 'Many People', ISBN: '123AI-34343-BN33', type: 'book'},
				{title: 'Javascript Cookbook', author: 'Douglas Crockford', ISBN: '123AI-34343-BN34', type: 'book'},
				{title: 'Stack Overflow', url: 'http://stackoverflow.com', type: 'web'}
	    ];

		var service = {
			getAll: getBooks,
			get: getBook,
			delete: deleteBook,
			update: updateBook,
			create: createBook
		};


		return service;


		// get all the books
		function getBooks() {
			return $q.when(books);
		}

		// get a resource by its title
		function getBook(title) {
			var book = books.filter(function(book) {
				return book.title === title;
			});

			return $q.when(book[0]);
		}

		// delete a book by index, this would really be an id thats unique to all resources
		function deleteBook(idx) {
			books.splice(idx, 1);
			return $q.when(books);
		}


		function updateBook(book) {
			for (var idx = 0; idx < books.length; idx++) {
				if (books[idx].title === book.title) {
					books[idx] = book;
					break;
				}
			}

			// update local storage with the new book info
			localStorageService.set('resources', vm.books);

			return $q.when(books);
		}

		function createBook(book) {
			// assume valid stuff for now
			books.push(book);

			// update local storage
			localStorageService.set('resources', books);

			// simulate a network call if i don't get to writing a server
			return $q.when(books);
			// or
			//return $http.post('/api/books/new', book);
		}
	}


})();