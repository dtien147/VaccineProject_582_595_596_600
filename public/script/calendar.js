var module = angular.module('calendarFunction', []);
module.controller('calendarCtrl', function($scope)
{


	$scope.loadPage  =function()
	{
		 $(".calendarTab").addClass("active");
	};

});
