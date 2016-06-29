var module = angular.module('parentFunction', []);
module.controller('parentCtrl', function($scope)
{
	$scope.columns =
	[
		{
			field: "Child's name"
		},
		{
			field: "Task"
		},
		{
			field: "Remind via parent's email"
		}
	];

	$scope.removechild = function (id)
	{
		var data;
		var link = "./parent/remove_child/" + id;
		 $.post(link, data, function (res){

			});

			location.reload(true);
	};

	$scope.switchRemind = function (id)
	{
		var data;
		var status;
		if ($("#settings").is (":checked"))
		{		status = "on";
	}
		else
		{
			status = "off";
		}
		var link = "./parent/switch_reminder/" + id + "/" + status;
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
