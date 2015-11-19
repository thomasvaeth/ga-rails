class User < ActiveRecord::Base


	validates_presence_of :password, on: :create

	validates :email,
	presence: true,
	uniqueness: {case_sensitive: false}

	validates :firstname, presence: true, length: {maximum: 20}
	validates :lastname, presence: true, length: {maximum: 30}
	validates :password,
		presence: true,
		length: {
		minimum: 8,
		maximum: 99,
		too_short: "must be greater than %{count} characters",
		too_long: "must be less than %{count} characters"
	},confirmation: true
	
	has_secure_password
	def self.authenticate email, password
		User.find_by_email(email).try(:authenticate, password)
	end
end
