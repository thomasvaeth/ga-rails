class SessionsController < ApplicationController
	def new
	end

	def create
		user = User.authenticate login_params['email'], login_params['password']
		if user
			session[:user_id] = user.id
			redirect_to root_path
		else
			flash[:danger] = 'Incorrect email/password, please try again'
			redirect_to login_path
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to root_path
	end

	private

	def login_params
		params.require(:user).permit(:email, :password)
	end
end
