// book controller
(function() {
	'use strict';

	angular.module('gloo-app.resources')
		.controller('ResourceController', ResourceController);


	ResourceController.$inject = ['ResourceService', '$routeParams', '$mdSidenav', '$mdToast', 'localStorageService', '$mdMedia'];

	function ResourceController(ResourceService, $routeParams, $mdSidenav, $mdToast, localStorageService, $mdMedia) {
		var vm = this;

		vm.types = ['web','book'];

		vm.title = 'Books!';
		vm.resources = [];
		vm.resource = null;
		vm.newResource = false;
		vm.resourceIndex = -1;

		vm.deleteResource = deleteResource;
		vm.toggleResourceList = toggleResourceList;
		vm.selectResource = selectResource;
		vm.addResource = addResource;
		vm.saveResource = saveResource;
		vm.navigateTo = navigateTo;

		activateController();

		function activateController() {
			return getResources();
		}

		function getResources() {
			return ResourceService.getAll()
				.then(function(resources){
					vm.resources = resources;
				});
		}

		function deleteResource() {
			ResourceService.delete(vm.resourceIndex).then(DeleteSuccessCB, DeleteFailCB);

			function DeleteSuccessCB(resources) {
				vm.resources = resources;
				vm.resource = null;
				vm.resourceIndex = -1;

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

		function selectResource(resource, index) {
			vm.resource = resource;
			vm.resourceIndex = index;
			vm.newResource = false;
			if (!$mdMedia('gt-sm')) {
				$mdSidenav('left').close();
			}

		}

		function toggleResourceList() {
			$mdSidenav('left').toggle();
		}


		// add a new book
		function addResource() {
			vm.resource = {};
			vm.newResource = true;
		}

		// save the book from UI
		function saveResource() {

			if (vm.resourceForm.$valid) {
				console.log("YES")
			} else {
				console.log("NO")
			}
			ResourceService.create(vm.resource).then(AddBookSuccessCB,AddBookFailCB);

			function AddBookSuccessCB(resources) {
				vm.resources = resources;

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
			window.open(vm.resource.url, "Some Place");
		}
	}

})(); // end of module