$(document).ready(function(){
	var originalLyftprice = $("#Lyft").html();
	var originalLyftprice_p = $("#LyftPlus").html();

	$("#plus").click(function(){
		var val = parseFloat($("#surge").val());
		var lyftPrice = originalLyftprice.replace("$", "").split("-");
		var lyftPrice_p = originalLyftprice_p.replace("$", "").split("-");

		if(val <= 20.0){
			val += 0.25;
			$("#surge").val(val);

			lyftPrice[0] =  "$"+Math.floor((parseFloat(lyftPrice[0]) * val)).toString()
			lyftPrice[1] =   "-"+Math.floor((parseFloat(lyftPrice[1]) * val)).toString()
			lyftPrice_p[0] =  "$"+Math.floor((parseFloat(lyftPrice_p[0]) * val)).toString()
			lyftPrice_p[1] =   "-"+Math.floor((parseFloat(lyftPrice_p[1]) * val)).toString()
			lyftPrice = lyftPrice.join().replace(",","")
			lyftPrice_p = lyftPrice_p.join().replace(",","")
			$("#Lyft").html(lyftPrice)
			$("#LyftPlus").html(lyftPrice_p)
		} else {}
	});

	$("#minus").click(function(){
		var val = parseFloat($("#surge").val());
		var lyftPrice = originalLyftprice.replace("$", "").split("-");
		var lyftPrice_p = originalLyftprice_p.replace("$", "").split("-");

		if(val >= 1.0){
			val == 1.0 ? val = 1 : val -= 0.25;
			$("#surge").val(val);

			lyftPrice[0] =  "$"+Math.floor((parseFloat(lyftPrice[0]) * val)).toString()
			lyftPrice[1] =   "-"+Math.floor((parseFloat(lyftPrice[1]) * val)).toString()
			lyftPrice_p[0] =  "$"+Math.floor((parseFloat(lyftPrice_p[0]) * val)).toString()
			lyftPrice_p[1] =   "-"+Math.floor((parseFloat(lyftPrice_p[1]) * val)).toString()
			lyftPrice = lyftPrice.join().replace(",","")
			lyftPrice_p = lyftPrice_p.join().replace(",","")
			$("#Lyft").html(lyftPrice)
			$("#LyftPlus").html(lyftPrice_p)

		} else {}
		
	});
//false = apple
//true  = android
var phone = null;

if(navigator.userAgent.match(/iPhone/i)){
 	$(".apple").show();
 	phone = false;
}

if(navigator.userAgent.match(/Android/i)){
 	$(".android").show();
 	phone = true;
}

var clicks1 = 1;
$("#clickable1").click(function(){
	clicks1+=1;
	if(clicks1 > 2)
	{ 
	 if(phone){
	   window.open("https://play.google.com/store/apps/details?id=com.ubercab&hl=en");
	 } else {
	   window.open("https://itunes.apple.com/us/app/uber/id368677368");
	 }
	}
});
var clicks2 = 1;
$("#clickable2").click(function(){
	clicks2+=1;
	if(clicks2 > 2)
	{ 
	 if(phone){
	   window.open("https://play.google.com/store/apps/details?id=me.lyft.android&hl=en");
	 } else {
	   window.open("https://itunes.apple.com/us/app/lyft-taxi-bus-app-alternative/id529379082?mt=8");
	 }
	}
});

});
