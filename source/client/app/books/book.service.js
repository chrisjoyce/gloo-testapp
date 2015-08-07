(function() {

	angular.module('gloo-app.books')
		.factory('BookService', BookService);


	GlooBookService.$inject = ['$http'];


	function BookService($http) {

		var service = {
			getAll: getBooks,
			get: getBook,
			delete: deleteBook,
			update: updateBook
		};


		return service;


		// service api, using promises
		function getBooks() {
			return [
				{title: 'Design Patterns', author: 'Many People', ISBN: '123AI-34343-BN33'},
				{title: 'Javascript Cooking', author: 'Douglas Crockford', ISBN: '123AI-34343-BN34'}
	    ];
		}

		function getBook(title) {

		}
	}


})();