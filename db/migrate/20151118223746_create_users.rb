class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.string :password_digest
      t.string :email
      t.string :ubercode
      t.string :lyftcode

      t.timestamps null: false
    end
  end
end
