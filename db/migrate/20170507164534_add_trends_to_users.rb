class AddTrendsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :trends, :text
  end
end
