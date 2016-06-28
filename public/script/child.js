var module = angular.module('loadField', []);
module.controller('ctrl', function($scope)
{
    $scope.columns =
    [
      {
        field: "Date"
      },
      {
        field: "Vaccine"
      },
      {
        field: "Note"
      },
      {
        field: "Status"
      }
    ];

    $scope.loadGender = function(gender)
    {
      $(".homeTab").addClass("active");

      if (gender === "girl")
      {
        $("[name=sex]").val(["girl"]);
      }

      else if (gender === "boy")
      {
       $("[name=sex]").val(["boy"]);
      }

   var x = document.getElementsByClassName('status');
   var btn = document.getElementsByClassName('btnNote');
      for (var i = 0; i < x.length; i++)
      {


        console.log(x[i].innerText);
        if (x[i].innerText.indexOf("done")!== -1)
        {

          btn[i].style.visibility = "hidden";

       }
      }
    };

    $scope.taskDone = function(childId, noteId)
    {
      location.href = childId + "/complete_note/" + noteId;
    }

    $scope.taskRemove = function(childId, noteId)
    {
      location.href = childId + "/remove_note/" + noteId;
    }

});
