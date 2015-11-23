$(function(){
var options = {
  types: ['address']
};

var from = document.getElementById('from');
autocomplete = new google.maps.places.Autocomplete(from, options);
var to = document.getElementById('to')
autocomplete2 = new google.maps.places.Autocomplete(to, options);

$("#savedTo").on("change",function(){$("#to").val($("#savedTo").val())})
$("#savedFrom").on("change",function(){$("#from").val($("#savedFrom").val())})
$("#to").on("focus", function(){$(this).select()})
$("#from").on("focus", function(){$(this).select()})
$("#saveFrom").click(function(){saveAddress("#fromAddress",$(this))})
$("#saveTo").click(function(){saveAddress("#toAddress", $(this))})
$(".removeAddress").click(function(){removeAddress($(this))})
})

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