class AddLongToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :long, :boolean
  end
end
