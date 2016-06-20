 $(function() {
    $( "#datepicker" ).datepicker();
  });


function removechild(id)
{
	var data;
	var link = "./parent/remove_child/" + id;
	 $.post(link, data, function (res){

    });
}

function modifychild(id)
{
  var data;
  var link = "./parent/modify_child/" + id;
  $.post(link, data, function(res){});
}
