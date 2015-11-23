$(document).ready(function() {
	renderMap('byCount');
	
	$("#uberMap").click(function() {
		renderMap('byUber');
	});
	$("#lyftMap").click(function() {
		renderMap('byLyft');
	});
	$("#countMap").click(function() {
		renderMap('byCount');
	});

	$.ajax(
		"https://freegeoip.net/json/",
		{
			method : "GET",
			success : function(data,textStatus,garbage) {
				$("#loc").val(data.region_name);
				$("#slat").val(data.latitude);
				$("#slon").val(data.longitude);	
				var latlng = String(data.latitude) + "," + String(data.longitude);
				var data = {latlng};		
				$.ajax(
					"/location",
					{
						method : "GET",
						data : data,
						success : function(data,textStatus,garbage) {
							$("#from").val(data.results[0].formatted_address);	
							$("#from").data('default', data.results[0].formatted_address);
						}
					}
				);
			}
		}
	);
});