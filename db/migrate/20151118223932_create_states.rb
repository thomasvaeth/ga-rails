class CreateStates < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.string :state
      t.string :count
      t.string :milestotal
      t.string :faretotal

      t.timestamps null: false
    end
  end
end
