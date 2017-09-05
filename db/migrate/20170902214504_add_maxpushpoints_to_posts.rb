class AddMaxpushpointsToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :maxpushpoints, :integer
  end
end
