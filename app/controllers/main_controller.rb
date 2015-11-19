
class MainController < ApplicationController

	def index
	end

	def results
		coords = Geocoder.coordinates(params_pass["to"]) 
		slat = params_pass["slat"]
		slon = params_pass["slon"]
		dlat = coords[0]
		dlon = coords[1]

		client = Uber::Client.new do |config|
  		config.server_token  = ENV["TOKEN"]
		end
		
		render json: client.price_estimations(start_latitude: slat, start_longitude: slon,
                         end_latitude: dlat, end_longitude: dlon)
	end

	private

	def params_pass 
		params.permit(:from, :to, :loc, :slat, :slon)
	end

end
