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
		render plain: params[:address]
	end

	private

	def user_params
	  params.require(:user).permit(:firstname, :lastname, :email, :password, :password_confirmation)
	end
end