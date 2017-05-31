class AddPicToUsers < ActiveRecord::Migration
  def change
    add_column :users, :pic, :integer
  end
end
