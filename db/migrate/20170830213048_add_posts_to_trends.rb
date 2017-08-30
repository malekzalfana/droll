class AddPostsToTrends < ActiveRecord::Migration
  def change
    add_column :trends, :posts, :integer
  end
end
