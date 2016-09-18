class AddFacenumberToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :facenumber, :integer
  end
end
