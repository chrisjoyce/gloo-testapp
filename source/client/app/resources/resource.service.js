(function() {

	angular.module('gloo-app.resources')
		.factory('ResourceService', ResourceService);


	ResourceService.$inject = ['$http', '$q', 'localStorageService'];


	function ResourceService($http, $q, localStorageService) {
		var resourcesInStore = localStorageService.get('resources');

		var resources = resourcesInStore || [
				{title: 'Design Patterns', author: 'Many People', ISBN: '123AI-34343-BN33', type: 'book'},
				{title: 'Javascript Cookbook', author: 'Douglas Crockford', ISBN: '123AI-34343-BN34', type: 'book'},
				{title: 'Stack Overflow', url: 'http://stackoverflow.com', type: 'web'}
	    ];

		var service = {
			getAll: getResources,
			get: getResource,
			delete: deleteResource,
			update: updateResource,
			create: createResource
		};


		return service;


		// get all the resources
		function getResources() {
			return $q.when(resources);
		}

		// get a resource by its title
		function getResource(title) {
			var resource = resources.filter(function(resource) {
				return resource.title === title;
			});

			return $q.when(resource[0]);
		}

		// delete a resource by index, this would really be an id thats unique to all resources
		function deleteResource(idx) {
			resources.splice(idx, 1);
			return $q.when(resources);
		}


		function updateResource(resource) {
			for (var idx = 0; idx < resources.length; idx++) {
				if (resources[idx].title === resource.title) {
					resources[idx] = resource;
					break;
				}
			}

			// update local storage with the new resource info
			localStorageService.set('resources', vm.resources);

			return $q.when(resources);
		}

		function createResource(resource) {
			// assume valid stuff for now
			resources.push(resource);

			// update local storage
			localStorageService.set('resources', resources);

			// simulate a network call if i don't get to writing a server
			return $q.when(resources);
			// or
			//return $http.post('/api/resources/new', resource);
		}
	}


})();