class UsersController < ApplicationController
	def show
	end

	def new
		@user = User.new
	end

	def create
	end
end