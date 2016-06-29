var module = angular.module('profileFunction', []);
module.controller('profileCtrl', function($scope)
{


	$scope.loadPage  =function()
	{
		 $(".profileTab").addClass("active");
	};

});
