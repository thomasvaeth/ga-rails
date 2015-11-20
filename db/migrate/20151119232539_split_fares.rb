class SplitFares < ActiveRecord::Migration
  def change
  	add_column :states, :uberfare, :float
  	add_column :states, :lyftfare, :float
  	remove_column :states, :count, :string
  	add_column :states, :count, :integer
  	remove_column :states, :faretotal, :string
  	remove_column :addresses, :city, :string
  	remove_column :addresses, :state, :string
  	remove_column :addresses, :zip, :string
  end
end
