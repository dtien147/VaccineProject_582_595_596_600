function loadGender(gender)
{

   $("#homeTab").addClass("active");
  
   if (gender === "girl")
   {
     $("[name=sex]").val(["girl"]);
   }

   else if (gender === "boy")
   {
    $("[name=sex]").val(["boy"]);
   }

var x = document.getElementsByClassName('status');
var btn = document.getElementsByClassName('btnDone');
   for (var i = 0; i < x.length; i++)
   {


     console.log(x[i].innerText);
     if (x[i].innerText.indexOf("done")!== -1)
     {

       btn[i].style.visibility = "hidden";

    }
   }
}



function taskDone(childId, noteId)
{
    location.href = childId + "/complete_note/" + noteId;
}

function taskRemove(childId, noteId)
{
  location.href = childId + "/remove_note/" + noteId;
}
