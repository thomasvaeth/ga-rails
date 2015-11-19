
class MainController < ApplicationController
	@@BASE_CHARGE = 1.35
	@@BASE_CHARGE_P = 2.02
	@@MINIMUM = 4.00
	@@MINIMUM_P = 6.00
	@@COSTPERMILE = 1.35
	@@COSTPERMILE_P = 2.02
	@@COSTPERMINUTE = 0.24
	@@COSTPERMINUTE_P = 0.36
	@@TRUSTFEE = 1.95


	def index
	end

	def results
		coords = Geocoder.coordinates(params_pass["to"]) 
		slat = params_pass["slat"]
		slon = params_pass["slon"]
		dlat = coords[0]
		dlon = coords[1]

		state = params_pass["loc"]

		client = Uber::Client.new do |config|
  		config.server_token  = ENV["TOKEN"]
		end
		
		data = client.price_estimations(start_latitude: slat, start_longitude: slon,
                         end_latitude: dlat, end_longitude: dlon)
		@ride_data = uber_lyft_data(data)
	end

	private

	def params_pass 
		params.permit(:from, :to, :loc, :slat, :slon)
	end

	class Lyft 
		def initialize duration,estimate,distance,display_name
			@duration = duration
			@estimate = estimate
			@distance = distance
			@display_name = display_name
		end

		def duration 
			@duration
		end

		def estimate 
			@estimate
		end

		def distance 
			@distance
		end

		def display_name 
			@display_name
		end
	end

	def uber_lyft_data uber_data
		lyft_est =  lyft_charge(uber_data[0]["distance"],uber_data[0]["duration"]).floor
		lyft_p_est = lyft_charge_p(uber_data[0]["distance"],uber_data[0]["duration"]).floor

		lyft = Lyft.new(uber_data[0][:duration],"$"+lyft_est.to_s+ "-" +(lyft_est+2).to_s,uber_data[0][:distance],"Lyft")
		lyft_p = Lyft.new(uber_data[0][:duration],"$"+lyft_p_est.to_s+ "-" +(lyft_p_est+3).to_s,uber_data[0][:distance],"Lyft Plus")
		
		uber = []

		uber << uber_data[0] 
		uber << uber_data[4]
		uber << uber_data[5]
		uber << lyft
		uber << lyft_p
		uber
	end

	def lyft_charge miles,minutes
		charge = @@BASE_CHARGE + (@@COSTPERMINUTE*(minutes/60)) + (@@COSTPERMILE*miles)+ @@TRUSTFEE
		puts charge
		if charge < @@MINIMUM 
		 @@MINIMUM
	    else
		 charge.round(2)
		end
	end

	def lyft_charge_p miles,minutes
		charge = @@BASE_CHARGE_P + (@@COSTPERMINUTE_P*(minutes)/60) + (@@COSTPERMILE_P*miles)+ @@TRUSTFEE;
		if charge < @@MINIMUM_P 
		 @@MINIMUM_P
	    else
		 charge.round(2)
		end
	end

end
