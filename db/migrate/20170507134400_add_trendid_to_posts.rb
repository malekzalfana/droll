class AddTrendidToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :trendid, :integer
  end
end
