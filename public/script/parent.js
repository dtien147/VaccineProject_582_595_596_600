var module = angular.module('parentFunction', []);
module.controller('parentCtrl', function($scope)
{
	$scope.removechild = function (id)
	{
		var data;
		var link = "./parent/remove_child/" + id;
		 $.post(link, data, function (res){

			});

			location.reload(true);
	};

	$scope.modifychild = function(id)
	{
		location.href = "child/" + id;
	};

	$scope.loadPage  =function()
	{
		 $(".homeTab").addClass("active");
	};

});
