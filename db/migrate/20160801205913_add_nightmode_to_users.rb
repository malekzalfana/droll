class AddNightmodeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :nightmode, :boolean
  end
end
