$(function(){
var options = {
  types: ['address']
};

var from = document.getElementById('from');
autocomplete = new google.maps.places.Autocomplete(from, options);
var to = document.getElementById('to')
autocomplete2 = new google.maps.places.Autocomplete(to, options);

$("#saveFrom").click(function(){saveAddress("#fromAddress",$(this))})
$("#saveTo").click(function(){saveAddress("#toAddress", $(this))})
})

function saveAddress(elementName, button){
	var address = $(elementName).children(".address").first().html()
	console.log(address)
	$.ajax({url:"/users/newAddress", data:{address:address}}).done(function(data){
		console.log(data)
		//button.prop("disabled", true).html("Saved!")
	}).fail(function(message){
		console.log(message.responseText)
	})
}