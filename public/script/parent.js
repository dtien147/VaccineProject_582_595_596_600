 $(function() {
    $( "#datepicker" ).datepicker();
  });
  
 
function removechild(id)
{
	var data;
	var link = "./parent/removechild/" + id;
	 $.post(link, data, function (res){
   
    });
	location.reload(true);
} 