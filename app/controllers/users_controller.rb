class UsersController < ApplicationController
	def show
		unless @current_user
			flash[:danger] = "You are not logged in."
			redirect_to root_path
		end
	end

	def new
		@user = User.new
	end

	def create
		@user = User.create user_params
		if @user
			session[:user_id] = @user.id
			flash[:success] = "User created!!"
			redirect_to root_path
		else
			flash[:danger] = "Credentials Invalid!!"
			redirect_to signup_path
		end
	end



	def newAddress
		if @current_user
			@current_user.address.create address: params[:address]
			test = Geocoder.coordinates(params[:address]) 
			render plain: 'success'
		else
			render plain: 'error'
		end
	end

	def deleteAddress
		if @current_user
			@address = @current_user.address.find_by address: params[:address]
			@address.delete
			render plain: 'success'
		else
			render plain: 'error'
		end
	end

	private

	def user_params
	  params.require(:user).permit(:firstname, :lastname, :email, :password, :password_confirmation)
	end
end