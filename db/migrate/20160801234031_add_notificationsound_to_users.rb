class AddNotificationsoundToUsers < ActiveRecord::Migration
  def change
    add_column :users, :notificationsound, :boolean
  end
end
