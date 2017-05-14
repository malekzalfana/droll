class AddPostedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :posted, :boolean
  end
end
