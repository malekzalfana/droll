class AddGrantedToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :granted, :boolean
  end
end
