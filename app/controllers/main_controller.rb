class MainController < ApplicationController

	def index
	end

	def results
		#Data.count ++ 
		#Data.state = params_pass["loc"]
	end

	private

	def params_pass 
		params.permit(:from, :to, :loc)
	end

end
