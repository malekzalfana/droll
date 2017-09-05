class AddPushpointsToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :pushpoints, :integer
  end
end
