class AddPassedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :passed, :boolean
  end
end
