class AddImageaddressToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :imageaddress, :string
  end
end
