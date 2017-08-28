class AddMcToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :mc, :boolean
  end
end
