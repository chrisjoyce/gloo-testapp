(function() {

	angular.module('gloo-app.books')
		.factory('BookService', BookService);


	BookService.$inject = ['$http', '$q'];


	function BookService($http, $q) {

		var books = [
				{title: 'Design Patterns', author: 'Many People', ISBN: '123AI-34343-BN33'},
				{title: 'Javascript Cooking', author: 'Douglas Crockford', ISBN: '123AI-34343-BN34'}
	    ];

		var service = {
			getAll: getBooks,
			get: getBook,
			delete: deleteBook,
			update: updateBook,
			create: createBook
		};


		return service;


		// service api, using promises
		function getBooks() {
			return books;
		}

		function getBook(title) {
			var book = books.filter(function(book) {
				return book.title === title;
			});

			// so I know this is a bit hacky, but I'm assuming unique titles atm
			return $q.when(book[0]);
		}

		function deleteBook(id) {
			books.splice(idx, 1);
			return $q.when(books);


			for (var idx = 0; idx < books.length; idx++) {
				var book = books[idx];
				if (book.title === id) {
					debugger;
					books.splice(idx, 1);
					break;
				}
			}

			return $q.when(books);
		}

		function updateBook(id) {
			console.log("TODO update");
		}

		function createBook(book) {
			// assume valid stuff for now
			books.push(book);
			// simulate a network call if i don't get to writing a server
			return $q.when(books);
			// or
			//return $http.post('/api/books/new', book);
		}
	}


})();