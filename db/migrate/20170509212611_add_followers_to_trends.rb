class AddFollowersToTrends < ActiveRecord::Migration
  def change
    add_column :trends, :followers, :integer
  end
end
