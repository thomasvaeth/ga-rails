
class MainController < ApplicationController

	def index
	end

	def results
		#Data.count ++ 
		#Data.state = params_pass["loc"]
		coords = Geocoder.coordinates(params_pass["to"]) 
		@@slat = params_pass["slat"]
		@@slon = params_pass["slon"]
		@@dlat = coords[0]
		@@dlon = coords[1]
		redirect_to results_path
	end

	def renderresults

	slat = @@slat
	slon = @@slon

	dlat = @@dlat
	dlon = @@dlon

		client = Uber::Client.new do |config|
  		config.server_token  = 'TOKEN'
		end
		
		render json: client.price_estimations(start_latitude: slat, start_longitude: slon,
                         end_latitude: dlat, end_longitude: dlon)
	end

	private

	def params_pass 
		params.permit(:from, :to, :loc, :slat, :slon)
	end

end
