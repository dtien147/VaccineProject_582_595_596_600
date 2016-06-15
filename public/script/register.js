$(function () {
	$("form").submit(function(e){
		var values = $("form").serializeArray();
		var password = values[3].value;
		var password_confirmation = values[4].value;
		if(password !== password_confirmation) {
			$("#error").text("Confirm password is incorrect");			
			e.preventDefault();
		}
	});
});