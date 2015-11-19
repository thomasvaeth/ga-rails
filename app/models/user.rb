class User < ActiveRecord::Base
	has_secure_password

	validates_presence_of :password, on: :create

	validates :email,
	presence: true,
	uniqueness: {case_sensitive: false}

	validates :firstname, presence: true, length: {maximum: 20}
	validates :lastname, presence: true, length: {maximum: 30}

	confirmation: true

	def self.authenticate email, password
		User.find_by_email(email).try(:authenticate, password)
	end
end
