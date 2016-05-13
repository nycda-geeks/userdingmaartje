var timer;

$(function(){
	$('#search').on('keyup', function(e){
		//if (e.keyCode === 13) {
			if (timer) {
				clearTimeout(timer);
			}
			var parameters = { name: $(this).val(), ajax: true };

			timer = setTimeout(function() {
				
				if (parameters.name) {
					$.post( "/search", parameters, function( data ) {
						//$( "#results" ).html( data );
						var $this = $("#results").empty();
						for (x in data) {
							$($this).append('<li><a href="mailto:' + data[x].email + '">' + data[x].firstname + ' ' + data[x].lastname +'</a></li>');
						};
					});
				} else {
					$("#results").empty();
				}
			}, 0);
		//};
	});
});
