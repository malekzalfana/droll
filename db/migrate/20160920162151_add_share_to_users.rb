class AddShareToUsers < ActiveRecord::Migration
  def change
    add_column :users, :share, :integer
  end
end
