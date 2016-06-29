
var module = angular.module('loadField', []);
module.controller('ctrl', function($scope)
{
    $scope.columns =
    [
      {
        field: "Tên"
      },
      {
        field: "Công dụng"
      },
      {
        field: "Tác dụng phụ"
      }
    ];

    $scope.loadPage = function()
    {
      $(".vaccineTab").addClass("active");
    };
});
