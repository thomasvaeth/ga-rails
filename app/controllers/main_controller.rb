require 'open-uri'

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
		# result = request.location
		# render json: result
	end

	def location
		latlng = params["latlng"]
		url =  'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latlng+'&result_type=street_address&key='+ ENV["GSERVER"]
		response = open(url).read
	    render json: response
	end

	def results
		coords = Geocoder.coordinates(params_pass["to"]) 
		location = Geocoder.coordinates(params_pass["from"]);
		dlat = coords[0]
		dlon = coords[1]
		slat = location[0]
		slon = location[1]
		start = location[0].to_s + "," + location[1].to_s
		stop = dlat.to_s + "," + dlon.to_s

		urls =  'https://maps.googleapis.com/maps/api/geocode/json?latlng='+start+'&result_type=street_address&key='+ ENV["GSERVER"]
		urld =  'https://maps.googleapis.com/maps/api/geocode/json?latlng='+stop+'&result_type=street_address&key='+ ENV["GSERVER"]
		startresponse = open(urls).read
		stopresponse = open(urld).read

		add1 = JSON.parse(startresponse)
		add2 = JSON.parse(stopresponse)
		
		@state = params_pass["loc"]

		client = Uber::Client.new do |config|
  		config.server_token  = ENV["TOKEN"]
		end
		
		data = client.price_estimations(start_latitude: slat, start_longitude: slon,
                         end_latitude: dlat, end_longitude: dlon)
		@ride_data = [uber_lyft_data(data), add1, add2, @current_user, @state]
		uber_estimate = @ride_data[0][0].estimate.dup
		lyft_estimate = @ride_data[0][3].estimate.dup
		uber_estimate.slice!(0)
		lyft_estimate.slice!(0)
		uber_estimate = uber_estimate.split("-")
		lyft_estimate = lyft_estimate.split("-")
		uber_estimate = (uber_estimate[0].to_i+uber_estimate[1].to_i)/2.0
		lyft_estimate = (lyft_estimate[0].to_i+lyft_estimate[1].to_i)/2.0
		distance = @ride_data[0][3].distance
		this_state = State.find_by state: @state
		this_state.update_columns(uberfare: this_state.uberfare+uber_estimate)
		this_state.update_columns(lyftfare: this_state.lyftfare+lyft_estimate)
		this_state.update_columns(count: this_state.count+1)
		this_state.update_columns(milestotal: this_state.milestotal+distance)
		puts uber_estimate
		puts lyft_estimate
	end

	private

	def params_pass 
		params.permit(:from, :to, :loc, :slat, :slon)
	end

	class Lyft 
		def initialize duration,estimate,distance,display_name,surge
			@duration = duration
			@estimate = estimate
			@distance = distance
			@display_name = display_name
			@surge_multiplier = surge
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

		def surge_multiplier
			@surge
		end
	end

	def uber_lyft_data uber_data
		lyft_est =  lyft_charge(uber_data[0]["distance"],uber_data[0]["duration"]).floor
		lyft_p_est = lyft_charge_p(uber_data[0]["distance"],uber_data[0]["duration"]).floor

		lyft = Lyft.new(uber_data[0][:duration],"$"+lyft_est.to_s+ "-" +(lyft_est+2).to_s,uber_data[0][:distance],"Lyft","To be Determined")
		lyft_p = Lyft.new(uber_data[0][:duration],"$"+lyft_p_est.to_s+ "-" +(lyft_p_est+3).to_s,uber_data[0][:distance],"Lyft Plus","To be Determined")
		
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
