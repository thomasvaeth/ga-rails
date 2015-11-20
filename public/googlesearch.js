$(function(){
var options = {
  types: ['address']
};

var from = document.getElementById('from');
autocomplete = new google.maps.places.Autocomplete(from, options);
var to = document.getElementById('to')
autocomplete2 = new google.maps.places.Autocomplete(to, options);

$("#from").on("focus", clearDefaultFrom)
$("#saveFrom").click(function(){saveAddress("#fromAddress",$(this))})
$("#saveTo").click(function(){saveAddress("#toAddress", $(this))})
$(".removeAddress").click(function(){removeAddress($(this))})
})

function clearDefaultFrom(){
	var from = $("#from")
	if(from.val()==from.data("default")){
		from.val("")
	}
}

function saveAddress(elementName, button){
	var address = $(elementName).children(".address").first().html()
	console.log(address)
	$.ajax({url:"/users/newAddress", data:{address:address}}).done(function(data){
		button.prop("disabled", true).html("Saved!")
	}).fail(function(message){
		button.prop("disabled", true).html("Error Saving!")
	})
}

function removeAddress(element){
	var address = element.siblings().html()
	$.ajax({url:"/users/deleteAddress", data:{address:address}}).done(function(data){
		element.parent().remove()
	}).fail(function(message){
		console.log(message.responseText)
	})	
}