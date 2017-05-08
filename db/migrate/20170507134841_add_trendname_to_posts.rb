class AddTrendnameToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :trendname, :text
  end
end
