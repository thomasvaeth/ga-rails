// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var BASE_CHARGE = 1.35,
	BASE_CHARGE_P = 2.02,
	MINIMUM = 4.00,
	MINIMUM_P = 6.00,
	COSTPERMILE = 1.35,
	COSTPERMILE_P = 2.02,
	COSTPERMINUTE = 0.24,
	COSTPERMINUTE_P = 0.36,
	TRUSTFEE = 1.95;


var lyftCharge = function(miles,minutes){
	var charge = BASE_CHARGE
		   + (COSTPERMINUTE*minutes)
	 	   + (COSTPERMILE*miles)
	 	   + TRUSTFEE;
	if(charge < MINIMUM){
	 return MINIMUM
	} else {
	 return charge;
	}
}

var lyftChargePlus = function(miles,minutes){
	var charge = BASE_CHARGE_P
		   + (COSTPERMINUTE_P*minutes)
	 	   + (COSTPERMILE_P*miles)
	 	   + TRUSTFEE;
	if(charge < MINIMUM_P){
	 return MINIMUM_P
	} else {
	 return charge;
	}
}


