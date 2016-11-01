class AddVideo64ToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :video64, :string
  end
end
