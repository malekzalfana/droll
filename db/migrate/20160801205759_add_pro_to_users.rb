class AddProToUsers < ActiveRecord::Migration
  def change
    add_column :users, :pro, :boolean
  end
end
