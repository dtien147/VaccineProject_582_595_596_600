 $(function() {
    $( "#datepicker" ).datepicker();
  });


function removechild(id)
{
	var data;
	var link = "./parent/remove_child/" + id;
	 $.post(link, data, function (res){

    });

    location.reload(true);
}

function modifychild(id)
{
  location.href = "child/" + id;

}
