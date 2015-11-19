$(function(){
var options = {
  types: ['address']
};

var from = document.getElementById('from');
autocomplete = new google.maps.places.Autocomplete(from, options);
var to = document.getElementById('to')
autocomplete2 = new google.maps.places.Autocomplete(to, options);

$("#saveFrom").click(function(){saveAddress("#from",$(this))})
$("#saveTo").click(function(){saveAddress("#to", $(this))})
})

function saveAddress(elementName, button){
	var address = $(elementName).val()
	$.ajax({url:"/users/newAddress", data:{address:address}}).done(function(){
		button.prop("disabled", true).val("Saved!")
	})
}