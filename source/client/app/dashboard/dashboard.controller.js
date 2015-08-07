(function() {
	'use strict';



	angular.module('gloo-app')
		.controller('DashboardCtrl', DashboardCtrl);


	//DashboardCtrl.$inject = ['title'];

	function DashboardCtrl() {
		var vm = this;
		vm.title = "The Library!";

		activate();

		function activate() {
			console.log("Dashboard Activated");
		}

	}

})();